const userModel = require("../models/userModel");
const FormData = require('form-data');
const axios = require('axios');

const generateImage = async(req,res)=>{
    // console.log(process.env.CLIPDROP_API);
    try{
        const {userId, prompt} = req.body;
        

        const user = await userModel.findById(userId);
        if(!user || !prompt){
            res.json({success:false, message:"Missing details"})
        }

        if(user.creditBalance <= 0){
            return res.json({success:false , message: "Not Enough Credits", creditBalance : user.creditBalance});
        }
        
        const formData = new FormData()
        formData.append('prompt',prompt);

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
              },
              responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data,'binary').toString('base64');

        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{creditBalance: user.creditBalance-1});

        res.json({success:true,message: "Image Generated",creditBalance: user.creditBalance-1, resultImage});

    }catch(error){
        console.log(error);
        res.json({success:"hee",message:"catch error"});
    }
}

module.exports = {generateImage}