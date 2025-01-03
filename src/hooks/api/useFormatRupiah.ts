// hooks/useFormatRupiah.ts

const useFormatRupiah = () => {
    const formatRupiah = (amount: number): string => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };
  
    return formatRupiah;
  };
  
  export default useFormatRupiah;