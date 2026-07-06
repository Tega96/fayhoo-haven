import type { Request, Response } from "express";
import { prisma } from '../lib/prisma.js'

// GET /manager/123
export const getManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params

        const manager = await prisma.manager.findUnique({
            where: {cognitoId}
        })
        if (!manager) throw new Error(`Manager not found`)

        res.status(200).json(manager)
    } catch (error: any) {
        res.status(500).json({message: `Error getting manager ${error.message}`})
    }
}

// POST /manager
export const createManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })

        res.status(201).json(manager)
    } catch (error: any) {
        res.status(500).json({message: `Error creating new manager: ${error.message}`})
    }
}

// PUT /manager/:id
export const updateManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;

        const updatedManager = await prisma.manager.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber
            }
        })

        res.status(201).json(updatedManager)
    } catch (error: any) {
        res.status(500).json({ message: `Error updating manager's record`})
    }
}