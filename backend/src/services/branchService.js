import Branch from "../models/Branch.js";

export const createBranchService = async({name,address={},phone,opening_hours,location={}})=>{      
    const create = await Branch.create(
        {
            name,
            address,
            phone,
            opening_hours,
            location 
        }
    )
    return create;
}