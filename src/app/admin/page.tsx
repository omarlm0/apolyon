"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Trash2,
  RefreshCw,
  Filter,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getOrders, updateOrderStatus, deleteOrder } from "@/actions/admin";

type Order = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  orderType: string;
  variant: string;
  quantity: number;
  orderRef: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  contacted: {
    label: "Contacted",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
    icon: <Phone className="w-3.5 h-3.5" />,
  },
  shipped: {
    label: "Shipped",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
    icon: <Truck className="w-3.5 h-3.5" />,
  },
  completed: {
    label: "Completed",
    color: "text-[#C5A059]",
    bg: "bg-[#C5A059]/10 border-[#C5A059]/30",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
};

export default function AdminPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    setRefreshing(true);
    const result = await getOrders();
    if (result.success) {
      setOrdersList(result.orders as Order[]);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrdersList((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date() } : o))
      );
    }
  };

  const handleDelete = async (orderId: number) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const result = await deleteOrder(orderId);
    if (result.success) {
      setOrdersList((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  const filteredOrders = filterStatus === "all" ? ordersList : ordersList.filter((o) => o.status === filterStatus);

  const stats = {
    total: ordersList.length,
    pending: ordersList.filter((o) => o.status === "pending").length,
    contacted: ordersList.filter((o) => o.status === "contacted").length,
    shipped: ordersList.filter((o) => o.status === "shipped").length,
    completed: ordersList.filter((o) => o.status === "completed").length,
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070D1D] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-[#C5A059]">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="font-mono text-sm tracking-wider">LOADING ORDERS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070D1D] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-[#C5CBD3]/60 hover:text-[#C5A059] transition-colors text-xs mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#FAF6EE] uppercase">
              Order Dashboard
            </h1>
            <p className="text-xs text-[#C5CBD3]/60 mt-1 font-mono tracking-wider">
              APOLYON ADMIN PANEL
            </p>
          </div>
          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono tracking-wider rounded hover:bg-[#C5A059]/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>REFRESH</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-[#FAF6EE]", border: "border-[#C5A059]/20" },
            { label: "Pending", value: stats.pending, color: "text-amber-400", border: "border-amber-400/20" },
            { label: "Contacted", value: stats.contacted, color: "text-blue-400", border: "border-blue-400/20" },
            { label: "Shipped", value: stats.shipped, color: "text-emerald-400", border: "border-emerald-400/20" },
            { label: "Completed", value: stats.completed, color: "text-[#C5A059]", border: "border-[#C5A059]/20" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`border ${stat.border} bg-[#0A1228] rounded p-4 text-center`}
            >
              <p className={`text-2xl font-serif ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-[#C5CBD3]/50 font-mono tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-3.5 h-3.5 text-[#C5CBD3]/40 flex-shrink-0" />
          {["all", "pending", "contacted", "shipped", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded border transition-colors flex-shrink-0 ${
                filterStatus === status
                  ? "bg-[#C5A059]/20 border-[#C5A059]/50 text-[#C5A059]"
                  : "border-[#1A2340] text-[#C5CBD3]/50 hover:border-[#C5A059]/30 hover:text-[#C5CBD3]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 border border-[#1A2340] rounded bg-[#0A1228]">
            <Package className="w-10 h-10 text-[#C5CBD3]/20 mx-auto mb-3" />
            <p className="text-sm text-[#C5CBD3]/40">No orders found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.pending;
              return (
                <div
                  key={order.id}
                  className="border border-[#1A2340] bg-[#0A1228] rounded p-4 sm:p-5 hover:border-[#C5A059]/20 transition-colors"
                >
                  {/* Top Row: Ref + Status + Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-[#C5A059] font-mono text-sm font-medium">
                        #{order.orderRef}
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 border rounded text-[10px] font-mono tracking-wider uppercase ${config.bg} ${config.color}`}
                      >
                        {config.icon}
                        <span>{config.label}</span>
                      </span>
                      <span className="text-[10px] text-[#C5CBD3]/30 font-mono">
                        {order.variant.toUpperCase()} · {order.orderType.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Status Change Buttons */}
                      {order.status !== "contacted" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "contacted")}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider border border-blue-400/30 text-blue-400 rounded hover:bg-blue-400/10 transition-colors"
                        >
                          CONTACTED
                        </button>
                      )}
                      {order.status !== "shipped" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "shipped")}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider border border-emerald-400/30 text-emerald-400 rounded hover:bg-emerald-400/10 transition-colors"
                        >
                          SHIPPED
                        </button>
                      )}
                      {order.status !== "completed" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "completed")}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider border border-[#C5A059]/30 text-[#C5A059] rounded hover:bg-[#C5A059]/10 transition-colors"
                        >
                          COMPLETED
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 text-red-400/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-[#C5CBD3]/70">
                      <Package className="w-3.5 h-3.5 text-[#C5A059]/50 flex-shrink-0" />
                      <span>
                        <span className="text-[#FAF6EE]">{order.fullName}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#C5CBD3]/70">
                      <Mail className="w-3.5 h-3.5 text-[#C5A059]/50 flex-shrink-0" />
                      <span className="truncate">{order.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#C5CBD3]/70">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]/50 flex-shrink-0" />
                      <span>{order.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#C5CBD3]/70">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]/50 flex-shrink-0" />
                      <span>{order.city}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#C5CBD3]/70">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]/50 flex-shrink-0" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-3 pt-3 border-t border-[#1A2340] flex items-center justify-between">
                    <span className="text-[10px] text-[#C5CBD3]/40 font-mono tracking-wider">
                      QUANTITY: <span className="text-[#FAF6EE]">{order.quantity}</span> units ({order.quantity * 5}L)
                    </span>
                    <span className="text-[10px] text-[#C5CBD3]/30 font-mono">
                      Updated: {formatDate(order.updatedAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
