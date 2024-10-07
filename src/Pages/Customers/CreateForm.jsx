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
import { api } from "@/utils/axios";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const CreateForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryclient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (postbody) => {
      return api.post("/customer/create", postbody);
    },
    {
      onSuccess: () => {
        setIsDialogOpen(false);
        queryclient.invalidateQueries("get-customers");

        toast.success("Customer Created Successfully!");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleSubmit = () => {
    const { name, phone, address } = customer;

    if (!name || !phone || !address) {
      toast.warn("Please fill in all fields.");

      return;
    }

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
        <Button>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
          {/* <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              onChange={handleInputChange}
              id="name"
              defaultValue={customer.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              name="phone"
              id="phone"
              defaultValue={customer.phone}
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              name="address"
              id="address"
              onChange={handleInputChange}
              defaultValue={customer.address}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button className="w-full cursor-not-allowed opacity-50 ">
              Loading... <LoaderIcon />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="w-full">
              Create Customer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
