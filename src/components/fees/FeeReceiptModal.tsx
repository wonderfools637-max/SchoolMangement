import React from 'react';
import { X, Printer, Receipt, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_INFO } from '../../data/mockData';

export const FeeReceiptModal: React.FC = () => {
  const { selectedInvoice, isFeeReceiptOpen, setIsFeeReceiptOpen, showToast } = useSchool();

  if (!isFeeReceiptOpen || !selectedInvoice) return null;

  const handlePrint = () => {
    window.print();
    showToast('Fee Receipt voucher sent to printer.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Header (hidden on print) */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Official Fee Payment Voucher & Receipt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={() => setIsFeeReceiptOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 overflow-y-auto flex-1 bg-white print-area select-text">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={SCHOOL_INFO.crestLogo}
                  alt="School Crest"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                  {SCHOOL_INFO.name}
                </h1>
                <p className="text-[11px] text-slate-500 font-mono">
                  {SCHOOL_INFO.campus} · Accounts: {SCHOOL_INFO.phone}
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="px-2 py-0.5 bg-slate-900 text-white font-bold rounded-sm text-[10px] uppercase">
                Bank / Student Copy
              </span>
              <p className="text-slate-500 text-[11px] mt-1">Receipt No: <strong>{selectedInvoice.receiptNo || 'RCT-99120'}</strong></p>
            </div>
          </div>

          {/* Student & Voucher Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs mb-5 font-sans">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Student</span>
              <strong className="text-slate-900">{selectedInvoice.studentName}</strong>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Class & Sec</span>
              <strong className="text-slate-900">{selectedInvoice.class} - {selectedInvoice.section}</strong>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Invoice Voucher #</span>
              <strong className="text-slate-900 font-mono">{selectedInvoice.invoiceNo}</strong>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Billing Month</span>
              <strong className="text-slate-900">{selectedInvoice.month}</strong>
            </div>
          </div>

          {/* Line Item Breakdown */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Fee Head Particulars</th>
                  <th className="py-2.5 px-4 text-right">Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2 px-4 font-sans text-slate-800">Monthly Tuition & Instruction Fee</td>
                  <td className="py-2 px-4 text-right font-medium">{selectedInvoice.tuitionFee.toLocaleString()}</td>
                </tr>
                {selectedInvoice.transportFee > 0 && (
                  <tr>
                    <td className="py-2 px-4 font-sans text-slate-800">Dedicated AC Campus Transport Surcharge</td>
                    <td className="py-2 px-4 text-right font-medium">{selectedInvoice.transportFee.toLocaleString()}</td>
                  </tr>
                )}
                {selectedInvoice.examFee > 0 && (
                  <tr>
                    <td className="py-2 px-4 font-sans text-slate-800">Term Assessment & Examination Materials</td>
                    <td className="py-2 px-4 text-right font-medium">{selectedInvoice.examFee.toLocaleString()}</td>
                  </tr>
                )}
                {selectedInvoice.otherCharges > 0 && (
                  <tr>
                    <td className="py-2 px-4 font-sans text-slate-800">Laboratory & Computer Network Maintenance</td>
                    <td className="py-2 px-4 text-right font-medium">{selectedInvoice.otherCharges.toLocaleString()}</td>
                  </tr>
                )}
                {selectedInvoice.discount > 0 && (
                  <tr className="text-emerald-700">
                    <td className="py-2 px-4 font-sans">Institutional Merit / Sibling Scholarship Concession</td>
                    <td className="py-2 px-4 text-right font-medium">- {selectedInvoice.discount.toLocaleString()}</td>
                  </tr>
                )}
                {selectedInvoice.fine > 0 && (
                  <tr className="text-rose-700">
                    <td className="py-2 px-4 font-sans">Late Submission Surcharge Fine</td>
                    <td className="py-2 px-4 text-right font-medium">+ {selectedInvoice.fine.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="border-t-2 border-slate-900 bg-slate-50 font-mono font-bold">
                <tr>
                  <td className="py-2 px-4 font-sans text-slate-900">Total Bill Payable</td>
                  <td className="py-2 px-4 text-right text-slate-900">PKR {selectedInvoice.totalAmount.toLocaleString()}</td>
                </tr>
                <tr className="text-emerald-700 bg-emerald-50/50">
                  <td className="py-2 px-4 font-sans">Amount Paid & Realized</td>
                  <td className="py-2 px-4 text-right text-sm">PKR {selectedInvoice.paidAmount.toLocaleString()}</td>
                </tr>
                <tr className={selectedInvoice.dueAmount === 0 ? 'text-slate-500' : 'text-rose-700'}>
                  <td className="py-2 px-4 font-sans">Remaining Due Balance</td>
                  <td className="py-2 px-4 text-right">PKR {selectedInvoice.dueAmount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Method & Meta */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2 mb-6 font-mono">
            <span>Payment Mode: <strong>{selectedInvoice.paymentMethod || 'Bank Transfer (1Link/IBFT)'}</strong></span>
            <span>Date Received: <strong>{selectedInvoice.paymentDate || '2026-10-04'}</strong></span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> System Reconciled
            </span>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center font-mono text-[10px] text-slate-400">
                [Stamp Validated]
              </div>
              <span className="font-semibold text-slate-800">Accounts & Bursar Officer</span>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center font-mono text-[10px] text-slate-400">
                [Depositor Sign]
              </div>
              <span className="font-semibold text-slate-800">Student / Parent Signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
