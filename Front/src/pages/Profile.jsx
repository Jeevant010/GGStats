import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "../components/Differ/single/Header";
import Footer from "../components/shared/Footer";
import { UserCircle, Mail, Phone, Clock, LogOut, Loader } from "lucide-react";
import api from "../utils/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookie, , removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get("/me");
                setUser(data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        removeCookie("token", { path: "/" });
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <main className="flex-1 py-8 px-4 lg:px-6 max-w-[800px] mx-auto w-full">
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader size={24} className="animate-spin text-accent" />
                    </div>
                )}

                {error && (
                    <div className="text-live text-sm bg-live/10 px-6 py-4 rounded-xl border border-live/30 text-center">
                        {error}
                    </div>
                )}

                {user && (
                    <>
                        {/* Profile Header */}
                        <div className="glass rounded-2xl p-8 mb-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-xl">
                                    <UserCircle size={40} className="text-white" />
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h1 className="text-2xl font-bold text-white mb-1">{user.userName}</h1>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                                            <Mail size={14} />
                                            <span>{user.email}</span>
                                        </div>
                                        {user.phone && (
                                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                                                <Phone size={14} />
                                                <span>{user.phone}</span>
                                            </div>
                                        )}
                                        {user.createdAt && (
                                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                                                <Clock size={14} />
                                                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-live/10 text-live hover:bg-live/20 transition-colors text-sm"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4">Account Details</h2>
                            <div className="space-y-4">
                                {[
                                    { label: "Username", value: user.userName },
                                    { label: "Email", value: user.email },
                                    { label: "Phone", value: user.phone || "Not provided" },
                                    { label: "User ID", value: user._id },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                        <span className="text-gray-500 text-sm">{item.label}</span>
                                        <span className="text-white text-sm font-mono">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Profile;