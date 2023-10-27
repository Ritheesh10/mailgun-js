
const collection = require('../models/model')

module.exports.fetchdata = async (req, res) => {
    const id = req.params.id
    if (id) {
        try {
            const singledataResult = await collection.findById(id)
            res.json({success:"true",template:singledataResult,template_status:"ok"})
        } catch (err) {
            res.status(400).json({success:"false",error_message:`An error occurred ${err} `})
            
        }
    } else {
        try {
            const fetcheddataResult = await collection.find()
            res.json({success:"true",template:fetcheddataResult,template_status:"ok"})
        } catch (err) {
            res.json({success:"false",error_message:`An error occurred ${err} `,error_code:err.status})
        }
        
    }

}

module.exports.insertdata = async (req, res) => {
    // console.log(req.body.template_html);
    


    const newData = new collection(
        {
        template_html: req.body.template_html,
        template_json: req.body.template_json,
        template_innerhtml: req.body.template_innerhtml,
        template_status: 1,
        created_at:new Date().toISOString(),
        updated_at:new Date().toISOString()
        }
     )

    
    // console.log(typeof(newData),"dggddgddgdgdddgg")
    try {
        const insertedResult = await newData.save()
        res.json({success:"true",template_status:"ok",template:insertedResult})

 
    }catch(err){
        res.json({success:"false",error_message:`An error occurred ${err} `,error_code:err.status})
    }
    
}

module.exports.updatedata = async (req, res) => {
    const update = {
        template_html: req.body.template_html,
        template_json: req.body.template_json,
        updated_at:new Date().toISOString()


    }
    try {
        const updateResult = await collection.updateOne({ "_id": req.params.id }, { $set: update }); 
        if (updateResult.acknowledged){
            res.json({success:"true",template:updateResult,template_status:"ok"})
        } else {
            res.json({success:"false",error_message:`An error occurred ${err} `,error_code:err.status})
        }
    }catch(err){
        res.send('Error'+err)
    }
    
}

module.exports.sendEmail = async (req, res) => {
    var api_key = 'key-46b9a4daea4056e0623fa792710b0d8f';
    var domain = 'dev.freemummystuff.com';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
    
    

    
    // The base64 encoded input string
    let base64string = req.body.html;
    // console.log(base64string);

    // console.log(base64string);
  
    // Create a buffer from the string
    let bufferObj = Buffer.from(base64string, "base64");
  
    // Encode the Buffer as a utf8 string
    let decodedString = bufferObj.toString("utf8");
  
    //    console.log("The decoded string:", decodedString);
    console.log(decodedString, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    
    var data = {
        from: 'techmails@dev.freemummystuff.com',
        to: req.body.to,
        subject: req.body.subject,
        // html: decodedString
        html: decodedString
    }
    
    
    await mailgun.messages().send(data, (error, body) => {
        if (error) {
            // console.log("coming inside the if")
            res.json({ success: "false", error_message: `An error occurred ${error} `, error_code: error.status })
        }
        // console.log("mail sent", body);
        else {
            console.log("coming inside the else")
            res.json({ success: "true", template_data: body, template_status: "ok" })
        }
    })
}