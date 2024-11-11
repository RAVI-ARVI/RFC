import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/utils/axios";
import moment from "moment";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const TransactionsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    "get-all-transactions",
    () => {
      return api.get("/transactions/get-all").then((res) => res.data.data);
    },
    {
      onError: (err) => {
        console.log(err, "this is errors");
        if ((err.status = 401)) {
          navigate("/login");
        }
      },
    }
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
        {/* <img
          src={user && user.avatar && user.avatar.url}
          alt="avatar"
          className="w-20 h-20 rounded-full max-[900px]:hidden"
        /> */}
        {/* <h1 className="text-4xl max-[900px]:text-2xl"></h1> */}
        <Card>
          <CardHeader className="px-7 flex items-center justify-between flex-row">
            <CardTitle>All Transaction </CardTitle>

            {/* <AddTransactionForm loanData={data?.customer?.loans || []} /> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Loan Name</TableHead>
                  {/* <TableHead>Collected By</TableHead> */}

                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Remain Amount</TableHead>
                  <TableHead>Total Amount Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.length > 0 ? (
                  data?.map((element) => {
                    return (
                      <TableRow className="bg-accent" key={element?._id}>
                        <TableCell>
                          {moment(element?.paymentDate)?.format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell>{element?.customer?.name}</TableCell>
                        <TableCell>{element?.loan?.loanName}</TableCell>

                        {/* <TableCell >
                                  {element?.agent}
                                </TableCell> */}
                        {/* <TableCell>
                        {moment(element?.paymentDate)?.format("DD-MM-YYYY")}
                      </TableCell> */}
                        <TableCell>{element?.amount}</TableCell>

                        <TableCell>{element?.remainingAmount || "-"}</TableCell>
                        <TableCell>
                          {element?.loan?.amountPaid || "_"}
                        </TableCell>
                        <TableCell>
                          {/* <Trash
                          onClick={() => mutate(element._id)}
                          className="cursor-pointer"
                        /> */}
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
                      Transactions Not Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsPage;
