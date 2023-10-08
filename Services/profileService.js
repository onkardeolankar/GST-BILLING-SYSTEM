const getProfileDetails = async () => {
    // const SKIP = params.limit * params.offset;
    // const LIMIT = params.limit;
    // const userId = new Types.ObjectId(data.userId);
    
    const Profile = ([
    
    {company:"Regex Software Services"},
    {address_1:"Near gopalpura mod"},
    {address_2:"Jaipur"},
    {gst_in:"XXXXXXXXX12"},
    {pan:"XXXXXXX789"},
    {contact:"987654321"},
    {beneficiary:"Regex Software Services"},
    {acc_no:"XXXXXXXXXX88"},
    {ifsc:"SBIN0032305"},
    {bank_address1:"Gordhanpura Chowk"},
    {bank_address2:"jpr Del Highway"},
    {pin:"303108"}

      // { $sort: { created_at: -1 } },
      // { $skip: SKIP },
      // { $limit: LIMIT },
    ]);
    // console.log();
  
    if (Profile) {
    
      res = {
        success: true,
        message: "profile Details found successfully.",
        data: Profile,
      };
    } else {
      res = {
        success: false,
        message: "error no profile found",
      };
    }
    return res;
  };
  module.exports = { getProfileDetails };