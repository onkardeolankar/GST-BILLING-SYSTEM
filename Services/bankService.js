const { Types } = require("mongoose");
const { invoiceDetails } = require("../Models/invoices");
// const { BankDetails } = require("../Models/bankDetails");
const { poDetails, PODetails } = require("../Models/poDetails");
let total_invoice=0;
const d = new Date();
let year = String(d.getFullYear());
let full_year=parseInt(year.slice(-2))+1;
let month=String(d.getMonth()+1)<10?"0"+String(d.getMonth()+1):String(d.getMonth()+1);




const addBankDetails = async (data) => {
  console.log(">>>>>>>>>>>>>>>>>data", data);
  const userId = new Types.ObjectId(data.user_id);
  console.log(">>>>>>>>>>>>>>>>>userId", userId);
  const countInvoice =  await invoiceDetails.aggregate([
    {
      $match: {
        po_number:{
          $exists:true,
          
        }
      },
      
    },
    { $sort: { created_at: -1 } },
    
    { $project: {_id: 0,invoice_number:1}},
    
  ]);
  // console.log("total_invoice>>>>>",countInvoice[0].invoice_number.slice(20));
  total_invoice=countInvoice[0]?parseInt(countInvoice[0].invoice_number.slice(20)):0;
  console.log("total_invoice>>>>>",total_invoice);
  let invoice="REG/"+year+"-"+full_year+"/"+month+"/"+"regss"+(total_invoice?total_invoice+1:1);
  const invoice_details=await invoiceDetails.create({
    ...data,
    user_id:userId,
    invoice_number:invoice,
  });

  const poDetails = await PODetails.create({
    ...data,
    user_id: userId,
    invoice_number:invoice,
    
  });
  

  // const poDetails=await PODetails.updateMany({user_id: data.userId}, // Query parameter
  //                  {$set:{...data},user_id:data.user_id}, // Replacement document
  //                 {upsert:true})

  console.log(">>>>>>>>>>>>>>>>>poDetails", poDetails);

  let res;

  if (poDetails) {
    res = {
      success: true,
      message: "po Details added successfully.",
    };
  } else {
    res = {
      success: false,
      message: "Something went wrong.",
    };
  }

  return res;
};

const editBankDetails = async (data) => {
  console.log(">>>>>>>>>>>>>>>>>data", data);
  const userId = new Types.ObjectId(data.user_id);
  console.log(">>>>>>>>>>>>>>>>>userId", userId);

  const poDetails = await PODetails.updateMany(
    {user_id: new Types.ObjectId(data.user_id)},
    {$set:{...data}},
    {upsert:false}
   
  );


  console.log(">>>>>>>>>>>>>>>>>poDetails", poDetails);

  let res;

  if (poDetails) {
    res = {
      success: true,
      message: "po Details updated successfully.",
    };
  } else {
    res = {
      success: false,
      message: "Something went wrong.",
    };
  }

  return res;
};

const getBankDetails = async (params,query) => {
  const SKIP = params.limit * query.offset;
  console.log("skip=",typeof SKIP);
  const LIMIT = parseInt(params.limit);
 
  // console.log("count>>>>>",PODetails.count());
  // const userId = new Types.ObjectId(data.userId);

  
  
  const POList = await PODetails.aggregate([
    {
      $match: {
        po_number:{
          $exists:true,
          
        }
      },
      
    },
    { $sort: { created_at: -1 } },
    // { $skip: SKIP },
    // { $limit: LIMIT },
    
    
    
  
    // { $sort: { created_at: -1 } },
    
    // { $limit: LIMIT },
  ]);
  console.log(POList);

  if (POList) {
  
    res = {
      success: true,
      message: "po Details found successfully.",
      data: POList,
    };
  } else {
    res = {
      success: false,
      message: "No PO found.",
    };
  }
  return res;
};
const deleteBankDetails = async (params) => {
  // const SKIP = params.limit * params.offset;
  // const LIMIT = params.limit;
  // const userId = new Types.ObjectId(data.userId);
  
  const POList = await PODetails.deleteOne({user_id:params.id});
  // console.log(POList);

  if (POList) {
  
    res = {
      success: true,
      message: "invoice deleted successfully.",
    };
  } else {
    res = {
      success: false,
      message: "invoice not deleted due to some error!",
    };
  }
  return res;
};

module.exports = { addBankDetails, getBankDetails,deleteBankDetails,editBankDetails };
