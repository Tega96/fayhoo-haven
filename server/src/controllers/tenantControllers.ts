import type {Request, Response} from 'express'
import { prisma } from '../lib/prisma.js'
import { wktToGeoJSON} from '@terraformer/wkt';


// GET localhost:300/tenants/1234
export const getTenant = async (req: Request, res: Response): Promise<void> => {
    try {
        const {cognitoId} = req.params;
        const tenant = await prisma.tenant.findUnique({
            where: { cognitoId },
            include: {
                favorites: true,
            },
        });

        if (tenant) {
            res.status(200).json(tenant)
        } else {
            res.status(404).json({ message: "Tenant not found"})
        }
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving tenant ${error.message}`});
    }
}

// POST /tenants
export const createTenant = async (req: Request, res: Response) => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;

        const tenant = await prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });

        res.status(201).json(tenant)
    } catch (error: any) {
        res.status(500).json({ message: `Error creating new tenant: ${error.message}`})
    }
}

// PUT /tenants/123
export const updateTenant = async (req: Request, res: Response): Promise<void> => {
    try {
        const {cognitoId} = req.params
        const { name, email, phoneNumber } = req.body;
        
        const updatedTenant = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber
            }
        })

        res.status(201).json(updatedTenant)
    } catch (error: any) {
        res.status(500).json({message: `Error updating tenant ${error.message}`})
    }
}
