import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { api } from "@/utils/axios"
import { Label } from "@radix-ui/react-label"
import { useQuery } from "react-query"
import CreateForm from "./CreateForm"
import { CustomersTable } from "./CustomersTable"

const Customers = () => {
  const {data } = useQuery('get-cashflow', () => {
    return api.get(`/transactions/cashflow`).then((res)=>res.data)
  })
  return (
    <div className="min-h-[90vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card>
          <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
            <CardTitle>Cash Flow</CardTitle>
           
            </CardHeader>
            <div className="flex flex-col gap-5 p-5">
            <div className="flex items-start  flex-row lg:justify-between lg:items-center   gap-5">
                <div className="grid gap-2 w-full sm:w-72 ">
                <Label>Available Cash</Label>
              {data?.data?.availableCash?.toLocaleString('en-IN')}
                  {/* <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  /> */}
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                <Label>C Receivable</Label>
             {data?.data?.corporationReceivable?.toLocaleString('en-IN')}
               
              </div>
             
            </div>
            
            <div className="flex items-start  flex-row lg:justify-between lg:items-center   gap-5">
            <div className="grid gap-2 w-full sm:w-72">
                <Label>Interest Money</Label>
             
               {data?.data?.principalReceivable?.toLocaleString('en-IN')}
              </div>
             
            </div>
          </div>
   
        </Card>
      </TabsContent>
      </Tabs>
      
      <div className="flex gap-4 min-[1200px]:mx-10 mx-6 my-2 sm:mx-1 max-[500px]:mx-2 justify-between sm:justify-between  sm:items-center">
     
      <h3 className="text-2xl max-[900px]:text-2xl">
            Users
            {/* {user.fullName} */}
        </h3>
                <CreateForm/>
           
      </div>
      

      <div>
      <CustomersTable/>
      
      </div>      
    </div>
  )
}

export default Customers

