import Pet from "../../database/schemas/petSchema"

const getPetStatisticsQuery = async (year: number, month?: number, week?: number) => {
    const match: any = {
        $expr: {
            $and: [
                { $eq: [{ $year: "$createdAt" }, year] }
            ]
        }
    }
    month ? match.$expr.$and.push({ $eq: [{ $month: "$createdAt" }, month] }) : null
    week ? match.$expr.$and.push({ $eq: [{ $week: "$createdAt" }, week] }) : null

    const petsByType = await Pet.aggregate([
        { $match: match },
        {
            $lookup: {
                from: "pettypes",
                localField: "type",
                foreignField: "_id",
                as: "types"
            },

        },
        { $unwind: "$types" },
        {
            $group: {
                _id: "$types.title",
                count: { $sum: 1 },
                pets: { $push: "$$ROOT" }
            }
        },
        {
            $group: {
                _id: null,
                totalPets: { $sum: "$count" },
                petsByType: {
                    $push: {
                        type: "$_id",
                        count: "$count",
                        pets: "$pets"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalPets: 1,
                petsByType: 1
            }
        }

    ])
    const healthyPets = await Pet.aggregate([
        { $match: match },
        {
            $group: {
                _id: "$healthStatus",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                healthStatus: "$_id",
                count: 1
            }
        }
    ]);

    const adoptionStatus = await Pet.aggregate([
        { $match: match },
        {
            $group: {
                _id: "$adoptionStatus",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                adoptionStatus: "$_id",
                count: 1
            }
        }
    ]);

    return {
        totalPets: petsByType[0]?.totalPets || 0,
        petsByType: petsByType[0]?.petsByType || [],
        healthyPets: healthyPets.reduce((acc, { healthStatus, count }) => {
            acc[healthStatus] = count;
            return acc;
        }, {}),
        adoptedPets: adoptionStatus.reduce((acc, { adoptionStatus, count }) => {
            acc[adoptionStatus] = count;
            return acc;
        }, {})
    };


}
export default getPetStatisticsQuery