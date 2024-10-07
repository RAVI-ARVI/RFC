import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/utils/axios";
import { Trash } from "lucide-react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddLoanForm from "./AddLoanForm";
import AddTransactionForm from "./AddTransactionForm";

const CustomerViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  const { data, isLoading } = useQuery("getcustomerdetails", () => {
    return api.get(`/customer/${id}`).then((res) => res.data);
  });

  const user = data?.customer || {};
  const loansData = data?.customer?.loans || [];
  const transactionData = data?.customer?.transactions || [];

  const { mutate } = useMutation(
    (deleteID) => {
      return api.delete(`/transactions/${deleteID}`);
    },
    {
      onSuccess: () => {
        queryclient.invalidateQueries("getcustomerdetails");
        queryclient.invalidateQueries("get-cashflow");

        toast.success("Customer Transaction Deleted Successfully!");
      },
    }
  );

  const { mutate: deleteLoan } = useMutation(
    (loanID) => {
      return api.delete(`/customer/${id}/${loanID}`);
    },
    {
      onSuccess: () => {
        queryclient.invalidateQueries("getcustomerdetails");
        queryclient.invalidateQueries("get-cashflow");

        toast.success("Customer Transaction Deleted Successfully!");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const handleReturnToDashboard = () => {
    navigate("/home");
  };
  if (isLoading) {
    return <h1>Loading..........</h1>;
  }

  return (
    <div className="flex gap-6 min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>{user?.name}</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <div className="flex flex-col gap-5 p-5">
              <div className="flex items-start  flex-row lg:justify-between lg:items-center   gap-5">
                <div className="grid gap-2 w-full sm:w-72 ">
                  <Label>Total Interest Paid</Label>
                  {user?.totalInterestPaid}
                  {/* <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  /> */}
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Total Loan</Label>
                  {user?.totalLoanAmount}
                </div>
              </div>

              <div className="flex items-start  flex-row lg:justify-between lg:items-center   gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Total Paid Amount</Label>
                  {user?.totalPaidAmount}
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Remaining Due</Label>
                  {user?.remainingAmount}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader className="px-7 flex items-center justify-between flex-row">
          <CardTitle>Loan </CardTitle>
          <AddLoanForm />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Name </TableHead>
                <TableHead>Loan Type </TableHead>
                <TableHead className="md:table-cell">Start Date</TableHead>
                <TableHead className="md:table-cell">End Date</TableHead>
                {/* <TableHead>Amount Paid </TableHead> */}
                <TableHead>Principal Amount </TableHead>
                <TableHead>Repayment Paid </TableHead>
                <TableHead>Amount Paid / InterestPaid</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Interest Due </TableHead>
                <TableHead>Status </TableHead>
                <TableHead>Actions </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loansData && loansData.length > 0 ? (
                loansData.map((element) => {
                  return (
                    <TableRow className="bg-accent" key={element?._id}>
                      <TableCell className="font-medium">
                        {element?.loanName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {element?.loanType}
                      </TableCell>
                      <TableCell className="md:table-cell">
                        {/* {element.timeline.from} */}
                        {moment(element?.startDate)?.format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="md:table-cell ">
                        {moment(element?.endDate)?.format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell>{element.principalAmount}</TableCell>
                      <TableCell>{element.repaymentAmount || "*"}</TableCell>

                      <TableCell>
                        {element.amountPaid || element.totalInterestPaid}
                      </TableCell>
                      <TableCell>{element.interestRate || "*"}</TableCell>
                      <TableCell>{element.interestDuePeriod || "*"}</TableCell>
                      <TableCell>{element.status}</TableCell>
                      <TableCell>
                        <Trash
                          onClick={() => deleteLoan(element._id)}
                          className="cursor-pointer"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="text-3xl overflow-y-hidden">
                    You Don't have any Loan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-7 flex items-center justify-between flex-row">
          <CardTitle>Transaction </CardTitle>

          <AddTransactionForm loanData={data?.customer?.loans || []} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Type</TableHead>
                <TableHead className="md:table-cell">Paid Amount</TableHead>
                {/* <TableHead>Collected By</TableHead> */}
                <TableHead>Payment Date</TableHead>
                <TableHead>Remaining Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData && transactionData.length > 0 ? (
                transactionData?.map((element) => {
                  return (
                    <TableRow className="bg-accent" key={element?._id}>
                      <TableCell>{element?.transactionType}</TableCell>
                      <TableCell>{element?.amount}</TableCell>
                      {/* <TableCell >
                                  {element?.agent}
                                </TableCell> */}
                      <TableCell>
                        {moment(element?.paymentDate)?.format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell>{element?.remainingAmount}</TableCell>
                      <TableCell>
                        <Trash
                          onClick={() => mutate(element._id)}
                          className="cursor-pointer"
                        />
                      </TableCell>
                      {/* <TableCell className="font-medium">
                                  {element?.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element?.timeline?.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element?.timeline?.to}
                                </TableCell> */}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="text-3xl overflow-y-hidden">
                    You Don't have any Transactions.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerViewPage;
