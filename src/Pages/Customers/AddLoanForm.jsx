import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/axios";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const defaultState = {
  loanType: "",
  principalAmount: "",
  repaymentAmount: "",
  durationDays: "",
  startDate: "",
  endDate: "",
  interestRate: "",
  interestDuePeriod: "",
  loanName: "",
};

const AddLoanForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryclient = useQueryClient();
  const { id } = useParams();
  const [customer, setCustomer] = useState(defaultState);

  const { mutate, isLoading } = useMutation(
    (postbody) => {
      return api.post(`/customer/${id}/loan`, postbody);
    },
    {
      onSuccess: () => {
        setIsDialogOpen(false);
        queryclient.invalidateQueries("getcustomerdetails");

        toast.success("Loan Added  Successfully!");
        setCustomer(defaultState);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const handleSubmit = () => {
    // const { name, phone, address } = customer;

    // if (!name || !phone || !address) {
    //   toast.warn("Please fill in all fields.")

    //   return;
    // }

    mutate(customer);
  };

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
        <Button>Add Loan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Loan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loanName" className="text-right">
              Loan Name
            </Label>

            <Input
              name="loanName"
              id="loanName"
              onChange={handleInputChange}
              defaultValue={customer.loanName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Loan Type
            </Label>
            <Select
              name="loanType"
              onValueChange={(e) => {
                setCustomer((prevState) => ({
                  ...prevState,
                  loanType: e,
                }));
              }}
              defaultValue={customer.loanType}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Loan Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="interest">Interest</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="principalAmount" className="text-right">
              Principal Amount
            </Label>
            <Input
              name="principalAmount"
              id="principalAmount"
              defaultValue={customer.principalAmount}
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>

            <Input
              name="startDate"
              id="startDate"
              type="date"
              placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
              defaultValue={customer.endDate}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Input
              name="endDate"
              type="date"
              id="endDate"
              placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
              defaultValue={customer.endDate}
              className="col-span-3"
            />
          </div>

          {customer.loanType == "corporation" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="durationDays" className="text-right">
                  Total Days
                </Label>
                <Input
                  name="durationDays"
                  id="durationDays"
                  onChange={handleInputChange}
                  defaultValue={customer.durationDays}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="repaymentAmount" className="text-right">
                  Repayment Amount
                </Label>
                <Input
                  name="repaymentAmount"
                  id="repaymentAmount"
                  onChange={handleInputChange}
                  defaultValue={customer.address}
                  className="col-span-3"
                />
              </div>
            </>
          )}

          {customer.loanType == "interest" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interestRate" className="text-right">
                  InterestRate
                </Label>
                <Input
                  name="interestRate"
                  id="interestRate"
                  onChange={handleInputChange}
                  defaultValue={customer.interestRate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  DuePay
                </Label>
                <Select
                  name="interestDuePeriod"
                  onValueChange={(e) => {
                    setCustomer((prevState) => ({
                      ...prevState,
                      interestDuePeriod: e,
                    }));
                  }}
                  defaultValue={customer.interestDuePeriod}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select  Due Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button className="w-full cursor-not-allowed opacity-50 ">
              Loading... <LoaderIcon />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="w-full">
              Create Loan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLoanForm;
