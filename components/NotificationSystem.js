import { Toaster } from './ui/toaster';
import { toast } from '@/hooks/use-toast';

// NotificationSystem component renders the Toaster at the root
export default function NotificationSystem() {
  return <Toaster />;
}

// Helper function to show notifications from anywhere
export function showNotification({ title, description, variant = 'default', action }) {
  toast({ title, description, variant, action });
} 