import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

const Contact = () => {
    return (
        <div className="flex justify-center">
            <section class="bg-white w-4/5">
                <div>
                    <h2 class="mb-4 text-2xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                        Kontak Kami
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="top-bottom"
                        class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"
                    >
                        Jika Pengunjung menemukan error atau bug pada website
                        ini silahkan kirimkan feedback dengan menyertakan email
                        pada form dibawah ini{" "}
                    </p>
                    <form class="space-y-8">
                        <div>
                            <InputLabel value={"Email"} />
                            <TextInput
                                type="email"
                                name="email"
                                id="email"
                                className="w-full block"
                            />
                        </div>
                        <div>
                            <InputLabel value={"Pengirim"} />
                            <TextInput
                                type="text"
                                className="w-full block"
                                name="nama"
                                id="nama"
                            />
                        </div>
                        <div class="sm:col-span-2">
                            <InputLabel value={"Masukan"} />
                            <textarea
                                id="masukan"
                                name="masukan"
                                rows="6"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                                placeholder="biarkan kami mengetahui bug anda.."
                            ></textarea>
                        </div>
                        <ReCAPTCHA
                            className="g-recaptcha"
                            // onChange={(token) =>
                            //     setData("g-recaptcha-response", token)
                            // }
                            sitekey={import.meta.env.VITE_SITE_KEY}
                        ></ReCAPTCHA>
                        <InputError
                            // message={errors["g-recaptcha-response"]}
                            className="mt-2"
                        />

                        <PrimaryButton>Kirim Pesan</PrimaryButton>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
