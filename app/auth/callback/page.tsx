"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import setCookie from "@/lib/setCookie";
import useVerify from "@/hooks/useVerify";
import { message } from "antd";

function CallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { mutate } = useVerify();

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) {
            router.replace("/");
            return;
        }
        mutate(token, {
            onSuccess: () => {
                message.success("Authentication successful!");
                setCookie("token", token, 1);
                router.replace("/");
            },
            onError: () => {
                message.error("Authentication failed. Please try again.");
                router.replace("/");
            },
        });
    }, []);

    return <div>Verifying...</div>;
}

export default function Callback() {
    return (
        <Suspense fallback={<div>Verifying...</div>}>
            <CallbackContent />
        </Suspense>
    );
}