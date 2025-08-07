import useSWR from 'swr';
import { getwilayas } from '@/lib/api';

const fetchWilayas = async () => {
  return await getwilayas();
};

export default function useWilayas() {
  const { data, error, isLoading, mutate } = useSWR('wilayas', fetchWilayas, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    wilayas: data,
    isLoading,
    isError: error,
    mutate,
  };
}