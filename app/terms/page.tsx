export default function TermsPage() {
    return (
        <div className="lg:px-80 py-16 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: March 2026</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Sellify, you agree to be bound by these Terms of
                        Service. If you do not agree to these terms, please do not use our platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Use of Service</h2>
                    <p>Sellify provides an e-commerce platform for buying products online. You agree to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Provide accurate information when creating an account</li>
                        <li>Use the platform only for lawful purposes</li>
                        <li>Not attempt to disrupt or harm the platform or other users</li>
                        <li>Be responsible for all activity under your account</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Orders and Payments</h2>
                    <p>
                        All orders are subject to availability. We reserve the right to cancel
                        orders in cases of pricing errors or stock unavailability. Payments are
                        processed securely through Stripe. By placing an order, you authorize
                        the payment for the total amount including any applicable taxes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Returns and Refunds</h2>
                    <p>
                        We accept returns within 7 days of delivery for unused items in original
                        packaging. Refunds are processed within 5-7 business days after we
                        receive the returned item.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Intellectual Property</h2>
                    <p>
                        All content on Sellify including logos, text, images, and software is
                        the property of Sellify and protected by applicable intellectual property
                        laws. You may not reproduce or distribute any content without permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
                    <p>
                        Sellify is not liable for any indirect, incidental, or consequential
                        damages arising from your use of the platform. Our total liability
                        shall not exceed the amount paid for the specific order in question.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Changes to Terms</h2>
                    <p>
                        We reserve the right to update these terms at any time. Continued use
                        of the platform after changes constitutes acceptance of the new terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact</h2>
                    <p>
                        For any questions regarding these Terms of Service, contact us at{' '}
                        <a href="mailto:tamjidahmed644@gmail.com" className="text-blue-600 hover:underline">
                            tamjidahmed644@gmail.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}