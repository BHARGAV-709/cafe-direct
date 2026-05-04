'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Coffee, BarChart3 } from 'lucide-react';

function AdminContent() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    topItem: '',
    averageOrderValue: 0,
  });

  useEffect(() => {
    // Simulate loading admin data
    const savedOrders = localStorage.getItem('cafe-orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);

      // Calculate stats
      const totalRevenue = parsedOrders.reduce((sum: number, order: any) => sum + order.totalPrice, 0);
      setStats({
        totalOrders: parsedOrders.length,
        totalRevenue,
        topItem: 'Cappuccino',
        averageOrderValue: parsedOrders.length > 0 ? Math.round(totalRevenue / parsedOrders.length) : 0,
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-primary">☕ Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your café operations</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Coffee className="w-5 h-5 text-accent" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-2">All time</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹{stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground mt-2">Generated</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Avg Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹{stats.averageOrderValue}</div>
              <p className="text-xs text-muted-foreground mt-2">Per order</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Most Ordered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary line-clamp-1">{stats.topItem}</div>
              <p className="text-xs text-muted-foreground mt-2">Popular item</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-card-foreground text-2xl">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Phone</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Table</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Items</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-semibold">Amount</th>
                      <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(-10).reverse().map((order: any, idx: number) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-card-foreground font-medium">{order.customerName}</td>
                        <td className="py-3 px-4 text-muted-foreground">{order.customerPhone}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            Table {order.tableNumber}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">
                          {order.items.length} items
                        </td>
                        <td className="py-3 px-4 text-right text-primary font-bold">₹{order.totalPrice}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-accent/20 text-accent border-accent/30">Pending</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Coffee className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No orders yet. Start taking orders!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-card-foreground">Table QR Codes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((table) => (
                  <div
                    key={table}
                    className="p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer text-center"
                  >
                    <div className="text-3xl mb-2">📱</div>
                    <p className="font-semibold text-card-foreground">Table {table}</p>
                    <Button variant="outline" size="sm" className="w-full mt-3 border-border hover:bg-primary/10 transition-colors">
                      Generate QR
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-md">
                📊 View Analytics
              </Button>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all hover:shadow-md">
                👥 Manage Menu Items
              </Button>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:shadow-md">
                📋 View Settings
              </Button>
              <Button variant="outline" className="w-full border-border hover:bg-muted transition-colors">
                🔓 Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminContent />
    </Suspense>
  );
}
