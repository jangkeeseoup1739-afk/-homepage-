import { PROPERTY_INFO } from '../data/propertyData';

/**
 * Universal phone call trigger that works across all devices, desktops, and iframe sandboxes.
 * 1. Copies phone number to clipboard
 * 2. Attempts native 'tel:' protocol dial
 * 3. Dispatches global event to open PhoneCallModal with direct action buttons
 */
export const triggerPhoneCall = (e?: React.MouseEvent) => {
  if (e) {
    // If inside an anchor tag, we can let default href happen on mobile,
    // but dispatch modal to guarantee feedback on desktop/sandboxed iframes
  }

  const cleanPhone = PROPERTY_INFO.phone.replace(/[^0-9]/g, '');

  // 1. Auto-copy number to clipboard
  try {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(cleanPhone).catch(() => {});
    }
  } catch {
    // Ignore clipboard error in restricted sandboxes
  }

  // 2. Dispatch custom event so PhoneCallModal opens immediately
  window.dispatchEvent(new CustomEvent('open-phone-modal'));

  // 3. Attempt direct tel protocol
  try {
    window.location.href = `tel:${cleanPhone}`;
  } catch {
    // Ignore navigation errors
  }
};
