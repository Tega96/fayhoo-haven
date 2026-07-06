import type { Request, Response } from "express";
import { prisma } from '../lib/prisma.js'
import { Prisma } from "../generated/prisma/client.js";
import { wktToGeoJSON } from "@terraformer/wkt";
import { Bucket$ } from "@aws-sdk/client-s3";

// GET /properties
export const getProperties = async (req: Request, res: Response): Promise<void> => {

    try {
        const {
            favoriteIds,
            priceMin, priceMax,
            beds, baths,
            propertyType,
            squareFeetMin,
            squareFeetMax,
            amenities,
            availableForm,
            latitude,
            longitude,
        } = req.query

        let whereConditions: Prisma.Sql[] = [];

        if (favoriteIds){
            const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
            whereConditions.push(
                Prisma.sql`p.id In (${Prisma.join(favoriteIdsArray)})`
            )
        };

        if (priceMin) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" <= ${Number(priceMin)}`
            );
        };

        if (priceMax) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" >= ${Number(priceMax)}`
            );
        };

        if (beds && beds !== "any") {
            whereConditions.push(
                Prisma.sql`p.beds >= ${Number(beds)}`
            )
        };

        if (baths && baths !== "any") {
            whereConditions.push(
                Prisma.sql`p.baths >= ${Number(baths)}`
            )
        };

        if (squareFeetMin) {
            whereConditions.push(
                Prisma.sql`p.squareFeetMin <= ${Number(squareFeetMin)}`
            );
        };

        if (squareFeetMax) {
            whereConditions.push(
                Prisma.sql`p.squareFeetMax >= ${Number(squareFeetMax)}`
            )
        }

        if (amenities && amenities !== "any") {
            const amenitiesArray = (amenities as string).split(",")
            whereConditions.push(
                Prisma.sql`p.amenities @> ${amenitiesArray}`
            );
        };

        if (availableForm && availableForm !== "any") {
            const availableFormDate = typeof availableForm === "string" ? availableForm : null;
            if (availableFormDate) {
                const date = new Date(availableFormDate);
                if (!isNaN(date.getTime())) {
                    whereConditions.push(
                        Prisma.sql`EXIST (
                            SELECT 1 FROM "Lease" l
                            WHERE l."propertyId" = p.id
                            AND l. "startDate" <=${date.toISOString()}
                        )`
                    );
                }
            }
        }

        if (latitude && longitude) {
            const lat = parseFloat(latitude as string);
            const lng = parseFloat(longitude as string);
            const radiusInKilometers = 1000;
            const degrees = radiusInKilometers / 111; // Converts kilometers to degrees

            whereConditions.push(
                Prisma.sql`ST_DWithin(
                    l.coordinates::geometry,
                    ST_SetSRID(ST_MakePoint(&{lng}, &{lat}), 4326),
                    &{degrees}
                )`
            );
        }

        const completeQuery = Prisma.sql`
            SELECT p.*,
                json_build_object(
                    'id', l.id,
                    'address', l.address,
                    'city', l.city,
                    'state', l.state,
                    'country', l.country,
                    'postalCode', l."postalCode",
                    'coordinates', json_build_object(
                        'longitude', ST_X(l."coordinates"::geometry),
                        'latitude', ST_Y(l."coordinates"::geometry)
                    )
                ) as location
            FROM "Property" p
            JOIN "Location" l ON p."locationId" = l.id
            ${
                whereConditions.length > 0
                    ? Prisma.sql`WHERE ${Prisma.join(whereConditions, "AND")}`
                    : Prisma.empty
            }
        `;
        
        const properties = await prisma.$queryRaw(completeQuery)

        res.status(200).json(properties)
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving properties ${error.message}`})
    }
}

// GET /property/:id
export const getProperty = async (req: Request, res: Response):Promise<void> => {
    try {
        const { id } = req.params;

        const property = prisma.property.findUnique({
            where: {id},
            inclued: {
                location: true,
            }
        });

        if (!property) {
            res.status(404).json({ message: `Property not found`})
        } 
        const coordinates: { coordinates: string }[] = 
            await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;
        
        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        const propertyWithCoordinates = {
            ...property,
            loaction: {
                ...property.location,
                coordinates: {
                    longitude,
                    latitude,
                }
            }
        };

        res.status(200).json(propertyWithCoordinates)
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving property ${error.message}`})
    }
    
}


export const createProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const files = req.files as Express.Multer.File[];
        const {
            address,
            city, 
            state,
            country,
            postalCode,
            managerCognitoId,
            ...propertyData
        } = req.body;


    } catch (error: any) {
        res.status(500).json({message: `Error creating Property ${error.message}`})
    }
}