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
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs"; // Replaced moment with dayjs
import { Loader, Trash } from "lucide-react";
import React from "react";
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

  // Loans Table Setup
  const loanColumns = React.useMemo(
    () => [
      { accessorKey: "loanName", header: "Loan Name" },
      { accessorKey: "loanType", header: "Loan Type" },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ getValue }) => {
          const dateValue = getValue();
          return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "N/A";
        },
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ getValue }) => {
          const dateValue = getValue();
          return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "N/A";
        },
      },
      { accessorKey: "principalAmount", header: "Principal Amount" },
      { accessorKey: "repaymentAmount", header: "Repayment Paid", cell: ({getValue}) => getValue() || "*" },
      { header: "Amount Paid / InterestPaid", cell: ({row}) => row.original.amountPaid || row.original.totalInterestPaid || "*" },
      { accessorKey: "interestRate", header: "Interest Rate", cell: ({getValue}) => getValue() || "*" },
      { accessorKey: "interestDuePeriod", header: "Interest Due", cell: ({getValue}) => getValue() || "*" },
      { accessorKey: "status", header: "Status" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Trash
            onClick={() => deleteLoan(row.original._id)}
            className="cursor-pointer"
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id] // Added id to dependency array for deleteLoan
  );

  const [loanPagination, setLoanPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const loanTable = useReactTable({
    data: loansData,
    columns: loanColumns,
    state: { pagination: loanPagination },
    onPaginationChange: setLoanPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false, // Client-side pagination
  });

  // Transactions Table Setup
  const transactionColumns = React.useMemo(
    () => [
      { accessorKey: "transactionType", header: "Transaction Type" },
      { accessorKey: "amount", header: "Paid Amount" },
      {
        accessorKey: "paymentDate",
        header: "Payment Date",
        cell: ({ getValue }) => {
          const dateValue = getValue();
          return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "N/A";
        },
      },
      { accessorKey: "remainingAmount", header: "Remaining Amount" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Trash
            onClick={() => mutate(row.original._id)}
            className="cursor-pointer"
          />
        ),
      },
    ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // No dependency needed for mutate
  );

  const [transactionPagination, setTransactionPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const transactionTable = useReactTable({
    data: transactionData,
    columns: transactionColumns,
    state: { pagination: transactionPagination },
    onPaginationChange: setTransactionPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false, // Client-side pagination
  });

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
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin w-10 h-10 text-tubeLight-effect" />
      </div>
    );
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
              {loanTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loanTable.getRowModel().rows?.length ? (
                loanTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-accent"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={loanColumns.length}
                    className="h-24 text-center"
                  >
                    No loans found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Page {loanTable.getState().pagination.pageIndex + 1} of{" "}
              {loanTable.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loanTable.previousPage()}
              disabled={!loanTable.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loanTable.nextPage()}
              disabled={!loanTable.getCanNextPage()}
            >
              Next
            </Button>
          </div>
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
              {transactionTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {transactionTable.getRowModel().rows?.length ? (
                transactionTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-accent"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={transactionColumns.length}
                    className="h-24 text-center"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Page {transactionTable.getState().pagination.pageIndex + 1} of{" "}
              {transactionTable.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => transactionTable.previousPage()}
              disabled={!transactionTable.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => transactionTable.nextPage()}
              disabled={!transactionTable.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerViewPage;
