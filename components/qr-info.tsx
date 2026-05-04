'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

interface QRInfoProps {
  tableNumber: string;
}

export function QRInfo({ tableNumber }: QRInfoProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `${typeof window !== 'undefined' ? window.location.origin : ''}/menu?table=${tableNumber}`
  )}`;

  return (
    <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="p-4 text-center">
        <QrCode className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Table {tableNumber} QR Code
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Scan to start ordering
        </p>
      </CardContent>
    </Card>
  );
}
