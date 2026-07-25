import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { ServiceCard } from "../booking/ServiceCard";
import { allServices } from "../../data/services";

export function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section id="services" className="container-page py-16 sm:py-20">
      <SectionTitle
        eyebrow="Our services"
        title="Care that comes to you"
        description="Choose a home visit, a phone consultation, or a video call — pricing shown up front, every time."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {allServices.map((service) => (
          <motion.div
            key={service.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <ServiceCard
              service={service}
              onSelect={() =>
                navigate(
                  service.category === "home-visit" ? "/book/home-visit" : "/book/phone-consultation",
                  { state: { serviceId: service.id } },
                )
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
