import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  Search,
  Filter,
  DollarSign,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { FeeInvoice } from '../types';

export const FeesPage: React.FC = () => {
  const {
    invoices,
    setSelectedInvoice,
    setIsCollectFeeOpen,
    setIsFeeReceiptOpen,
    showToast,
  } = useSchool();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.class.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Financial aggregates
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDue = invoices.reduce((acc, curr) => acc + curr.dueAmount, 0);
  const recoveryRate = Math.round((totalCollected / (totalBilled || 1)) * 100);

  const handleCollect = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setIsCollectFeeOpen(true);
  };

  const handlePrintReceipt = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setIsFeeReceiptOpen(true);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Fees & Accounts Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fee generation, billing vouchers, real-time 1Link/bank payment recording
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Monthly Fee Batch for November 2026 initialized for all 2,458 students.', 'success')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Receipt className="w-4 h-4" />
            <span>Generate Monthly Challans</span>
          </button>
        </div>
      </div>

      {/* Financial Health Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Total Billed (Term)</span>
          <p className="text-xl font-bold font-mono text-slate-900 mt-1">
            PKR {totalBilled.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Full campus ledger</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 shadow-2xs">
          <span className="text-xs text-emerald-700 font-medium">Realized Collections</span>
          <p className="text-xl font-bold font-mono text-emerald-600 mt-1">
            PKR {totalCollected.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 mt-1 block font-mono font-medium">
            {recoveryRate}% collected
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-100 bg-rose-50/20 shadow-2xs">
          <span className="text-xs text-rose-700 font-medium">Outstanding Dues</span>
          <p className="text-xl font-bold font-mono text-rose-600 mt-1">
            PKR {totalDue.toLocaleString()}
          </p>
          <span className="text-[11px] text-rose-600 mt-1 block font-mono font-medium">
            Pending reconciliation
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Due Date Deadline</span>
          <p className="text-xl font-bold font-mono text-blue-600 mt-1">10th October</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Standard grace period</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fee ledger by student name, invoice #, or class..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Status"
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium"
          >
            <option value="All">All Invoices</option>
            <option value="Paid">Fully Paid</option>
            <option value="Pending">Pending Payment</option>
            <option value="Overdue">Overdue / Defaulter</option>
            <option value="Partial">Partial Clearance</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold select-none">
                <th className="py-3 px-4">Invoice Voucher #</th>
                <th className="py-3 px-4">Student & Class</th>
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-4 text-right">Total (PKR)</th>
                <th className="py-3 px-4 text-right">Paid (PKR)</th>
                <th className="py-3 px-4 text-right">Balance Due (PKR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {inv.invoiceNo}
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{inv.studentName}</p>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {inv.class}-{inv.section} · {inv.studentId}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {inv.month}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">
                    {inv.totalAmount.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                    {inv.paidAmount.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                    {inv.dueAmount.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : inv.status === 'Overdue'
                          ? 'bg-rose-50 text-rose-700'
                          : inv.status === 'Partial'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.dueAmount > 0 && (
                        <button
                          onClick={() => handleCollect(inv)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-2xs"
                        >
                          Collect
                        </button>
                      )}

                      <button
                        onClick={() => handlePrintReceipt(inv)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Print / View Receipt"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
