import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { ArrowLeftFromLine } from 'lucide-react';

export default function ButtonBack() {
  return (
    <Link href='/'><Button>
      <ArrowLeftFromLine />
      Back
    </Button></Link>
  )
}