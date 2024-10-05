import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/utils/axios"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

// eslint-disable-next-line react/prop-types
const AddTransactionForm = ({ loanData }) => {
    const {id}=useParams()
   
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryclient=useQueryClient()
  

  const { mutate,isLoading } = useMutation((postbody) => {
    return api.post(`/customer/${id}/transaction`, postbody)
  }, {
    onSuccess: () => {
      setIsDialogOpen(false)
      queryclient.invalidateQueries('getcustomerdetails')

      toast.success("Transaction  Created Successfully!")
    }
  })
  const [customer, setCustomer] = useState({
    transactionType: '',
    loanId: '',
    amount: '',
    paymentDate:''
  })

  const handleSubmit = () => {
    const { transactionType, loanId, amount } = customer;

 
    if (!transactionType || !loanId || !amount) {
      toast.warn("Please fill in all fields.")
  
      return;
    }
 
   
    mutate(customer)
 
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button >    Add Transaction</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Transaction</DialogTitle>
        {/* <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> */}
      </DialogHeader>
              <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="loanId" className="text-right">
                      loanId
                      </Label>
                  
                       <Select name="loanId"
              onValueChange={(e) => {
                setCustomer((prevState) => ({
                  ...prevState,
                  loanId: e,
                }));
                         
            }}
              defaultValue={customer.loanId}   >
      <SelectTrigger    className="col-span-3">
        <SelectValue placeholder="Select Loan" />
      </SelectTrigger>
      <SelectContent    >
                              <SelectGroup >
                                  {loanData?.map((item) => <SelectItem key={item?._id} value={item?._id}>{item?.loanName
 }</SelectItem>)}
      
          
                                
        
        </SelectGroup>
      </SelectContent>
    </Select>
                  
                      </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="transactionType" className="text-right">
           Type
          </Label>
            <Input
              name="transactionType"
             onChange={handleInputChange}
                          
            id="transactionType"
            defaultValue={customer.transactionType}
            className="col-span-3"
          />
        </div> */}
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="transactionType" className="text-right">
                          Type
                      </Label>
                  
                       <Select name="transactionType"
              onValueChange={(e) => {
                setCustomer((prevState) => ({
                  ...prevState,
                  transactionType: e,
                }));
                         
            }}
              defaultValue={customer.transactionType}   >
      <SelectTrigger    className="col-span-3">
        <SelectValue placeholder="Select  Type" />
      </SelectTrigger>
      <SelectContent    >
        <SelectGroup >
      
          <SelectItem value="corporation payment">Corporation Payment</SelectItem>
                                  <SelectItem value='principal payment'>Principal Payment</SelectItem>
                                  <SelectItem value='interest payment'>Interest Payment</SelectItem>
        
        </SelectGroup>
      </SelectContent>
    </Select>
                  
          </div>
         < div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="paymentDate" className="text-right">
          Paid Date
          </Label>
            <Input
              name="paymentDate"
              id="paymentDate"
               placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
            defaultValue={customer.paymentDate}
            className="col-span-3"
          />
          </div>
                  

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right">
          amount
          </Label>
            <Input
              name="amount"
            id="amount"
            defaultValue={customer.amount}
              className="col-span-3"
              onChange={handleInputChange}
          />
          </div>
         
      </div>
        <DialogFooter>
          {isLoading? <Button className="w-full cursor-not-allowed opacity-50 ">
       Loading... <LoaderIcon/>
      </Button>:<Button onClick={handleSubmit} className="w-full">Create Customer</Button>}
          
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default AddTransactionForm
