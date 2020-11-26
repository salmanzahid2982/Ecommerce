const stripe=require('stripe')
const uuid=require('uuid/v4')('sk_test_51Gv4n6AchwlggD1wOpKXkRGKRSPkfueA0w4dSO3kCyRGS6zH0gEuNn26RoAiNtYYTMR3e4QUKD8ZQSY34gR3vrZu00V4s0XRjx')
exports.makepayment=(req,res)=>{
    const {products,token}=req.body;
    console.log("Products",products);

    let amount=0;
    products.map(p=>{
        amount=amount+p.price;
    })

    const idempotencykey=uuid();
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customers=>{
        stripe.caharges.create({
            amount:amount,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            shipping:{
                name:token.card.name
            }
        },{idempotencykey})
        .then(result=>res.status(200).json(result))
        .catch(err=>{console.log(err);
        })
    })
    
}