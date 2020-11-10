const Order = require("../models/order");
const User = require("../models/user");

const createOrder = async(req ,res) => {

    const user = req.user;
    
    const orderId = await (await Order.find()).length;

    const newOrder = new Order({
        orderId : orderId,
        userId : user.userId,
        subtotal : req.body.subtotal
    });

    let savedOrder =  await newOrder.save();

    return res.status(201).json({
        message : "order created successfully",
        success : true,
        result : savedOrder,
    })
} 



const getOrder = async(req ,res ) => {

    const orders = await Order.find();
    const users = await User.find();
    
    const newArr = []
    users.forEach( (user) => {
        const userId = user.userId;
        let newData = userOrder(userId, orders);

        const eachUserData = {
            userId : userId,
            name : user.name,
            ...newData,

       }
       
       newArr.push(eachUserData);


    });
    return res.status(200).json({
        message : "Order list fetched successfully",
        success : true,
        result : newArr
    })
} 

const userOrder = (userId , orders ) => {

    let usersOrder = orders.filter( (order) => order.userId === userId );
    let noOfOrders = usersOrder.length;

    let sum = 0;
    usersOrder.forEach( (data) => {
        const subtotal = data.subtotal;
        sum += subtotal;
    });

    let averageBillValue = (sum / noOfOrders);
   
    const data = {
        noOfOrders : noOfOrders,
        averageBillValue : averageBillValue.toFixed(2)
    }

    return data;
    
}


const updateUsersOrder = async (req ,res ) => {

    const user = await User.find();
    if(user.length < 1 ){
        return res.status(404).json({
            message : "No users found",
            success : false
        })
    }

    const data = {
        noOfOrders : req.body.noOfOrders
    }

    await User.updateOne({ userId : req.params.userId } , data )
    .then( (result) => {
        return res.status(200).json({
            message : "Successfully updated",
            success : true
        });
    });


}

module.exports = {
    createOrder,
    getOrder, 
    updateUsersOrder,
 };