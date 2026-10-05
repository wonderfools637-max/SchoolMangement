import React, { useState, useEffect } from 'react';
import { X, CreditCard, DollarSign, Receipt, CheckCircle2 } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { FeeInvoice } from '../../types';

export const FeeCollectModal: React.FC = () => {
  const {
    isCollectFeeOpen,
    setIsCollectFeeOpen,
    selectedInvoice,
    recordFeePayment,
    invoices,
  } = useSchool();

  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Bank Transfer' | 'Card' | 'Online 1Link'>('Bank Transfer');

  useEffect(() => {
    if (selectedInvoice) {
      setPaymentAmount(selectedInvoice.dueAmount);
    }
  }, [selectedInvoice]);

  if (!isCollectFeeOpen || !selectedInvoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }
    recordFeePayment(selectedInvoice.id, paymentAmount, paymentMethod);
    setIsCollectFeeOpen(false);
  };

  const remainingAfterPayment = Math.max(0, selectedInvoice.dueAmount - paymentAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Fee Collection Counter</h2>
            <p className="text-xs text-slate-500">Record cash, bank deposit, or digital voucher settlement</p>
          </div>
          <button
            onClick={() => setIsCollectFeeOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Candidate & Invoice Summary Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Invoice Voucher #</span>
              <strong className="font-mono text-slate-900">{selectedInvoice.invoiceNo}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Student Name</span>
              <strong className="text-slate-900">{selectedInvoice.studentName} ({selectedInvoice.class})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Billing Period</span>
              <strong className="text-slate-900">{selectedInvoice.month}</strong>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-mono">
              <span className="text-slate-500">Total Invoice Amount</span>
              <strong className="text-slate-900">PKR {selectedInvoice.totalAmount.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-slate-500">Currently Outstanding</span>
              <strong className="text-rose-600 text-sm font-bold">
                PKR {selectedInvoice.dueAmount.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Payment Amount Input */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Payment Amount to Receive (PKR) *
            </label>
            <input
              type="number"
              required
              min="100"
              max={selectedInvoice.dueAmount}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block font-medium text-slate-700 mb-1.5">Payment Method *</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Bank Transfer', label: 'Bank Transfer (1Link/IBFT)' },
                { id: 'Cash', label: 'Campus Cash Counter' },
                { id: 'Card', label: 'Debit / Credit POS' },
                { id: 'Online 1Link', label: 'Online Bill Portal' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-colors ${
                    paymentMethod === m.id
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Remaining After Calculation */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-between font-mono">
            <span>Remaining Balance After Transaction:</span>
            <strong className={`font-bold ${remainingAfterPayment === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
              PKR {remainingAfterPayment.toLocaleString()}
            </strong>
          </div>

          <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCollectFeeOpen(false)}
              className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Receipt className="w-4 h-4" />
              <span>Record & Issue Receipt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
