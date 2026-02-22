'use client';

import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Store } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import setCookie from '@/lib/setCookie';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}







export default function AuthModal({ open, onClose }: AuthModalProps) {
  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };
  








  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={380}
      closeIcon={<span className="text-gray-400 text-[18px] font-light">✕</span>}
      className="overflow-hidden"

    >
      <div className="bg-white rounded-[20px] p-[44px_36px_36px] flex flex-col items-center">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Store size={28} color="#6366F1" />
            <span className="text-[24px] font-extrabold bg-linear-to-tr from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent -tracking-[0.5px]">
              ShopHub
            </span>
          </div>
          <h2 className="text-[18px] font-bold text-[#111827] mb-1.5">Welcome back</h2>
          <p className="text-[14px] text-[#6B7280] m-0">
            Sign in to your account to continue
          </p>
        </div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleAuth}
          block
          size="large"
          className="flex items-center justify-center gap-3 font-semibold text-[15px] text-[#374151] bg-white border border-[#E5E7EB] rounded-xl h-13 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#D1D5DB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.8 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" fill="#FFC107" />
            <path d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00" />
            <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.3 0-9.7-3.2-11.3-7.8l-6.5 5C9.6 39.5 16.3 44 24 44z" fill="#4CAF50" />
            <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4-4.2 5.3l.1-.1 6.2 5.2C37 38 44 33 44 24c0-1.2-.1-2.4-.4-3.5z" fill="#1976D2" />
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-[#9CA3AF] text-[12px] mt-5 mb-0">
          By continuing, you agree to our{' '}
          <span className="text-[#6366F1] cursor-pointer">Terms</span> &{' '}
          <span className="text-[#6366F1] cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </Modal>
  );
}
