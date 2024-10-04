import CreateForm from "./CreateForm"
import { CustomersTable } from "./CustomersTable"

const Customers = () => {
  return (
    <div className="min-h-[90vh] sm:gap-4 sm:py-4 sm:pl-20">
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

