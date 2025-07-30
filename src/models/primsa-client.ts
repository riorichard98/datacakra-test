import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect()
.then(()=> {
    console.log("Prisma connected successfully.");
})
.catch(error => {
    console.error("Failed to initialize Prisma client:", error);

    if (error instanceof Error) {
        console.error(`Error name: ${error.name}`);
        console.error(`Error message: ${error.message}`);
    }

    // Exit the process if Prisma initialization is critical
    process.exit(1);
})

export default prisma;