import 'dotenv/config'
import { Prisma, PrismaClient } from '../src/generated/prisma/client.js';
import { prisma } from '../src/lib/prisma.js'
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function toPascalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

async function insertLocationData(locations: any[]) {
    for (const location of locations) {
        const { id, country, city, state, address, postalCode, coordinates } = location;
        try {
            await prisma.$executeRaw`
                INSERT INTO "Location" ("id", "country", "city", "state", "address", "postalCode", "coordinates")
                VALUES (${id}, ${country}, ${city}, ${state}, ${address}, ${postalCode}, ST_GeomFromText(${coordinates}, 4326));
            `;
            console.log(`Inserted location for ${city}`);
        } catch (error) {
            console.error(`Error inserting location for ${city}:`, error)
            console.log('Coordinates: ', coordinates)
        }
    }
}

async function resetSequence(modelName: string) {
    const quotedModelName = `"${toPascalCase(modelName)}"`;

    const maxIdResult = await (
        prisma[modelName as keyof PrismaClient] as any
    ).findMany({
        select: {id: true},
        orderBy: { id: "desc" },
        take: 1,
    });

    if (maxIdResult.length === 0) return;

    const nextId = maxIdResult[0].id + 1;
    await prisma.$executeRaw`
        SELECT setval(pg_get_serial_sequence(${quotedModelName}, 'id'),
        (SELECT COALESCE(MAX(id), 0) + 1 FROM ${Prisma.raw(quotedModelName)}), false)
    `;
    console.log(`Reset sequence for ${modelName} to ${nextId}`);
}

async function deleteAllData(orderedFileNames: string[]) {
    const modelNames = orderedFileNames.map((fileName) => {
        return toPascalCase(path.basename(fileName, path.extname(fileName)));
    });

    for (const modelName of [...modelNames].reverse()) {
        const modelNameCamel = toCamelCase(modelName);
        const model = (prisma as any)[modelNameCamel];
        if (!model) {
            console.error(`Model ${modelName} not found in Prisma client`)
            continue;
        }
        try {
            await model.deleteMany({});
            console.log(`Cleared data from ${modelName}`)
        } catch (error) {
            console.error(`Error clearing data from ${modelName}:`, error)
        }
    }
}

function prepareDataForCreation(item: any, modelName: string) {
    const data = {...item};

    if (modelName === 'Property') {
        // Handle enum arrays with 'set' operator
        if (data.amenities && Array.isArray(data.amenities)) {
            data.amenities = { set: data.amenities };
        }
        if (data.highlights && Array.isArray(data.highlights)) {
            data.highlights = { set: data.highlights };
        }
        if (data.photoUrls && Array.isArray(data.photoUrls)) {
            data.photoUrls = { set: data.photoUrls };
        }
    }

    // Add handling for payment model
    if (modelName === 'Payment') {
        if (data.lease && data.lease.connect) {
            data.leaseId = data.lease.connect.id;
            delete data.lease;
        }
    }

    return data;
}



async function main() {
    const dataDirectory = path.join(__dirname, "seedData");

    const orderedFileNames = [
        "location.json",    // No dependencies
        "manager.json",     // No dependencies
        "property.json",    // Depends on location and manager
        "tenant.json",      // No dependencies
        "lease.json",       // Depends on property and tenant
        "application.json", // Depends on property and tenanat
        "payment.json"      // Depends on lease
    ];

    // Delete all existing data
    await deleteAllData(orderedFileNames);

    // Seed data
    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDirectory, fileName);

        if (!fs.existsSync(filePath)) {
            console.log(`File ${fileName} not found, skipping...`)
            break;
        }

        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const modelName = toPascalCase(path.basename(fileName, path.extname(fileName)));
        const modelNameCamel = toCamelCase(modelName)

        if (modelName === "Location") {
            await insertLocationData(jsonData);
        } else {
            const model = (prisma as any)[modelNameCamel];

            if (!model) {
                console.error(`Model ${modelName} does not exist on Prisma Client.`);
                continue;
            }
            try {
                for (const item of jsonData) {
                    // const data = prepareDataForCreation(item, modelName)
                    await model.create({
                        data: item,
                    });
                    console.log(`Inserted ${modelName} record with id ${item.id} from ${fileName}`);
                }
                console.log(`Seeded ${modelName} with data from ${fileName}`)
            } catch (error) {
                console.error(`Error seeding data for ${modelName}: ${error}`)
            }
        }

        // Reset the sequence after seeding each model
        await resetSequence(modelName);

        await sleep(1000);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());