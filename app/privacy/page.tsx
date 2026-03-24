export default function PrivacyPage() {
    return (
        <div className="lg:px-80 py-16 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: March 2026</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
                    <p>
                        When you sign in to Sellify using Google OAuth, we collect your name,
                        email address, and profile picture provided by Google. We do not collect
                        any additional personal information beyond what is necessary to provide
                        our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Create and manage your account</li>
                        <li>Process your orders and transactions</li>
                        <li>Send order confirmation and shipping updates</li>
                        <li>Improve our services and user experience</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Sharing</h2>
                    <p>
                        We do not sell, trade, or share your personal information with third parties
                        except as necessary to process payments (Stripe) and fulfill orders.
                        All payment information is handled securely by Stripe and we do not
                        store your card details.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your personal
                        information. Your data is stored securely and access is restricted
                        to authorized personnel only.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Cookies</h2>
                    <p>
                        We use cookies and similar technologies to maintain your session
                        and improve your experience on our platform. You can control cookie
                        settings through your browser preferences.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Access your personal data</li>
                        <li>Request deletion of your account and data</li>
                        <li>Opt out of non-essential communications</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:tamjidahmed644@gmail.com" className="text-blue-600 hover:underline">
                            tamjidahmed644@gmail.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}