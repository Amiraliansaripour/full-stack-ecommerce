export const response = ({code=200,message,res,result,data={}}) =>{
    res.status(code).json({
        result,
        message,
        data,
    })

}