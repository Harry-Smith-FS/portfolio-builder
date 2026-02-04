export { usePortfolio } from './usePortfolio';
export { useLocalStorage } from './useLocalStorage';
export { useSupabase } from './useSupabase';

// Composite hook that combines all hooks
export function usePortfolioApp() {
  const supabase = useSupabase();
  const portfolio = usePortfolio(supabase.investments, supabase.models);
  const storage = useLocalStorage();

  return {
    ...supabase,
    ...portfolio,
    ...storage
  };
}
