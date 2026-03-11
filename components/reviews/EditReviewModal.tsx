'use client';

import { Modal, Form, Rate, Input } from 'antd';
import { Pencil } from 'lucide-react';
import { Review } from './types/review.Types';
import useUpdateReview from '@/hooks/useUpdatereview';

const { TextArea } = Input;

interface EditReviewModalProps {
    review: Review | null;
    open: boolean;
    onClose: () => void;
}

export default function EditReviewModal({ review, open, onClose }: EditReviewModalProps) {
    const [form] = Form.useForm();
    const { mutate: updateReview, isPending } = useUpdateReview();

    if (!review) return null;

    const handleSave = () => {
        form.validateFields().then((values) => {
            updateReview(
                { id: review.id, rating: values.rating, comment: values.body },
                { onSuccess: onClose }
            );
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleSave}
            okText="Save Changes"
            confirmLoading={isPending}
            okButtonProps={{ className: 'bg-blue-600' }}
            title={
                <div className="flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-blue-600" />
                    <span>Edit Review</span>
                </div>
            }
        >
            <div className="flex items-center gap-3 py-3 mb-2 border-b border-gray-100">
                <img
                    src={review.product.image}
                    alt={review.product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                />
                <div>
                    <p className="text-sm font-semibold text-gray-800">{review.product.name}</p>
                    <p className="text-xs text-gray-400">{review.id}</p>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    rating: review.rating,
                    body: review.comment,
                }}
            >
                <Form.Item label="Your Rating" name="rating" rules={[{ required: true }]}>
                    <Rate allowHalf />
                </Form.Item>
                <Form.Item
                    label="Review Details"
                    name="body"
                    rules={[{ required: true, message: 'Please write your review' }]}
                >
                    <TextArea rows={4} placeholder="Tell others what you think..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}