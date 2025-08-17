/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.tsx' {
  const content: any;
  export default content;
}

declare module '*.ts' {
  const content: any;
  export default content;
}

declare module '@/features/employees/provider' {
  export * from '@/features/employees/provider';
}

declare module '@/features/shifts/provider' {
  export * from '@/features/shifts/provider';
}