'use client';

import { useState } from 'react';
import { Modal, Form, Input, Rate } from 'antd';
import { Star } from 'lucide-react';
import { ReviewTarget } from './types/Order.types';
import useCreateReview from '@/hooks/useCreateReview';

const { TextArea } = Input;

const RATING_LABELS: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
};

interface WriteReviewModalProps {
    target: ReviewTarget | null;
    open: boolean;
    onClose: () => void;
}

export default function WriteReviewModal({ target, open, onClose }: WriteReviewModalProps) {
    const [form] = Form.useForm();
    const [hoverRating, setHoverRating] = useState(0);
    const { mutate, isPending } = useCreateReview();

    if (!target) return null;

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            mutate(
                {
                    productId: target.item.productId,
                    rating: values.rating,
                    comment: values.body,
                },
                {
                    onSuccess: () => {
                        form.resetFields();
                        setHoverRating(0);
                        onClose();
                    },
                }
            );
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setHoverRating(0);
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Submit Review"
            cancelText="Cancel"
            confirmLoading={isPending}
            okButtonProps={{
                className: 'bg-blue-600 hover:bg-blue-700 border-blue-600',
                size: 'middle',
            }}
            cancelButtonProps={{ size: 'middle', disabled: isPending }}
            title={
                <div className="flex items-center gap-2 pb-1">
                    <div className="p-1.5 bg-amber-50 rounded-lg">
                        <Star className="h-4 w-4 text-amber-500" />
                    </div>
                    <span className="text-base font-semibold text-gray-800">Write a Review</span>
                </div>
            }
            width={520}
            centered
        >
            {/* Product Info */}
            <div className="flex items-center gap-3 py-3 px-4 mb-4 bg-gray-50 rounded-xl border border-gray-100">
                <img
                    src={target.item.product.image ?? '/placeholder.png'}
                    alt={target.item.product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                        {target.item.product.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Order: {target.orderId}</p>
                </div>
            </div>

            <Form form={form} layout="vertical" requiredMark={false}>
                <Form.Item
                    name="rating"
                    label={<span className="text-sm font-medium text-gray-700">Your Rating</span>}
                    rules={[{ required: true, message: 'Please select a rating' }]}
                >
                    <div className="flex items-center gap-3">
                        <Rate
                            disabled={isPending}
                            onChange={(val) => {
                                form.setFieldValue('rating', val);
                                setHoverRating(val);
                            }}
                            onHoverChange={setHoverRating}
                            className="text-2xl"
                        />
                        {hoverRating > 0 && (
                            <span className="text-sm font-semibold text-amber-500">
                                {RATING_LABELS[hoverRating]}
                            </span>
                        )}
                    </div>
                </Form.Item>

                <Form.Item
                    name="body"
                    label={<span className="text-sm font-medium text-gray-700">Review Details</span>}
                    rules={[
                        { required: true, message: 'Please write your review' },
                        { min: 20, message: 'Review must be at least 20 characters' },
                    ]}
                >
                    <TextArea
                        rows={4}
                        disabled={isPending}
                        placeholder="Share your experience — quality, packaging, delivery, etc."
                        className="rounded-xl resize-none"
                        showCount
                        maxLength={500}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}