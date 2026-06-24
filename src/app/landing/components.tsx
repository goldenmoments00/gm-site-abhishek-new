import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AnimatedPhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
  rotation?: number;
  delay?: number;
}

export const AnimatedPhotoFrame: React.FC<AnimatedPhotoFrameProps> = ({
  src,
  alt,
  className = "",
  rotation = 0,
  delay = 0,
}) => {
  const style = {
    animationDelay: `${delay}ms`,
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <div
      className={`animate-bounce-slow photo-frame ${className}`}
      style={style}
    >
      <div className="relative w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  letterDelay?: number;
  startDelay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  letterDelay = 200,
  startDelay = 0,
}) => {
  return (
    <span className={className}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-fade-in-up"
          style={{
            animationDelay: `${startDelay + index * letterDelay}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
};

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  imagePosition?: "left" | "right";
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  features,
  image,
  imagePosition = "right",
}) => {
  const isImageRight = imagePosition === "right";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className={isImageRight ? "" : "lg:order-2"}>
        <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
          {subtitle}
        </div>
        <h3 className="font-morganite font-bold text-4xl mb-6">{title}</h3>
        <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-6">
          {description}
        </p>
        <ul className="space-y-3 text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="font-plus-jakarta-sans">
              • {feature}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`relative aspect-square overflow-hidden rounded-lg image-zoom ${
          isImageRight ? "" : "lg:order-1"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

interface PortfolioItemProps {
  title: string;
  year: string;
  category: string;
  type: string;
  image: string;
  hoverImage?: string;
  href?: string;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  year,
  category,
  type,
  image,
  hoverImage,
  href = "#",
}) => {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${title} hover`}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="font-plus-jakarta-sans text-sm">{year}</div>
          <h3 className="font-morganite font-bold text-2xl">{title}</h3>
          <div className="flex space-x-2 text-sm">
            <span>{category}</span>
            <span>{type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface TestimonialProps {
  text: string;
  name: string;
  role: string;
  image: string;
}

export const TestimonialCard: React.FC<TestimonialProps> = ({
  text,
  name,
  role,
  image,
}) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="w-16 h-16 mx-auto mb-8">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-gray-400"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="font-plus-jakarta-sans text-xl leading-relaxed text-gray-700 mb-12 max-w-2xl mx-auto">
        {text}
      </p>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="text-left">
          <div className="font-plus-jakarta-sans font-semibold">{name}</div>
          <div className="font-plus-jakarta-sans text-sm text-gray-600">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingComponents = {
  AnimatedPhotoFrame,
  AnimatedText,
  ServiceCard,
  PortfolioItem,
  TestimonialCard,
};

export default LandingComponents;
