import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { IframeHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { MessageCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";

import "./floating-communications-button.css";

declare global {
    interface Window {
        hbspt?: {
            forms?: {
                create: (config: {
                    portalId: string;
                    formId: string;
                    region?: string;
                    target: string;
                }) => void;
            };
        };
    }
}

type ChannelLinkAction = {
    type: "link";
    href: string;
    target?: "_self" | "_blank";
    rel?: string;
};

type ChannelCallbackAction = {
    type: "callback";
    onSelect: () => void;
};

type ChannelEmbedAction = {
    type: "embed";
    embedMode?: "iframe" | "hubspot";
    embedUrl?: string;
    embedTitle?: string;
    iframeProps?: IframeHTMLAttributes<HTMLIFrameElement>;
    hubspot?: {
        portalId: string;
        formId: string;
        region?: string;
    };
};

type BaseChannel = {
    id: string;
    title: string;
    description?: string;
    icon: LucideIcon | string;
    badge?: string;
};

export type CommunicationChannel = BaseChannel &
    (ChannelLinkAction | ChannelCallbackAction | ChannelEmbedAction);

export type FloatingCommunicationsButtonProps = {
    channels: CommunicationChannel[];
    fabLabel?: string;
    icon?: LucideIcon | string;
    className?: string;
    panelTitle?: string;
    panelDescription?: string;
};

const PORTAL_ID = "floating-communications-button-root";
const HUBSPOT_SCRIPT_SRC = "https://js.hsforms.net/forms/embed/v2.js";

let hubspotScriptPromise: Promise<void> | null = null;

const loadHubspotFormsScript = () => {
    if (typeof window === "undefined") {
        return Promise.resolve();
    }

    if (hubspotScriptPromise) {
        return hubspotScriptPromise;
    }

    hubspotScriptPromise = new Promise((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
            `script[src="${HUBSPOT_SCRIPT_SRC}"]`,
        );

        if (existingScript) {
            if (existingScript.dataset.loaded === "true" || window.hbspt) {
                resolve();
                return;
            }

            existingScript.addEventListener(
                "load",
                () => {
                    existingScript.dataset.loaded = "true";
                    resolve();
                },
                { once: true },
            );
            existingScript.addEventListener(
                "error",
                () => reject(new Error("HubSpot script failed to load")),
                { once: true },
            );
            return;
        }

        const script = document.createElement("script");
        script.src = HUBSPOT_SCRIPT_SRC;
        script.async = true;
        script.charset = "utf-8";
        script.dataset.loaded = "false";
        script.addEventListener(
            "load",
            () => {
                script.dataset.loaded = "true";
                resolve();
            },
            { once: true },
        );
        script.addEventListener(
            "error",
            () => reject(new Error("HubSpot script failed to load")),
            { once: true },
        );
        document.body.appendChild(script);
    });

    return hubspotScriptPromise;
};

export const FloatingCommunicationsButton = ({
    channels,
    fabLabel = "Canales de comunicación",
    icon: fabIcon = MessageCircle,
    className,
    panelTitle = "Hablemos",
    panelDescription = "Elige el canal que prefieras para continuar",
}: FloatingCommunicationsButtonProps) => {
    const isFabIconUrl = typeof fabIcon === "string";
    const FabIconComponent = isFabIconUrl ? null : (fabIcon as LucideIcon);
    const [isOpen, setIsOpen] = useState(false);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
    const [activeEmbedChannel, setActiveEmbedChannel] =
        useState<(BaseChannel & ChannelEmbedAction) | null>(null);
    const firstButtonRef = useRef<HTMLButtonElement | null>(null);
    const firstAnchorRef = useRef<HTMLAnchorElement | null>(null);
    const hubspotContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const existingNode = document.getElementById(PORTAL_ID);
        if (existingNode) {
            setMountNode(existingNode);
            return;
        }

        const node = document.createElement("div");
        node.id = PORTAL_ID;
        document.body.appendChild(node);
        setMountNode(node);

        return () => {
            document.body.removeChild(node);
        };
    }, []);

    const isModalActive = isOpen || Boolean(activeEmbedChannel);

    useEffect(() => {
        if (!isModalActive) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                setActiveEmbedChannel(null);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isModalActive]);

    useEffect(() => {
        if (!isModalActive) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isModalActive]);

    useEffect(() => {
        if (!isOpen) return;
        const target = firstButtonRef.current ?? firstAnchorRef.current;
        if (target) target.focus();
    }, [isOpen]);

    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setActiveEmbedChannel(null);
    }, []);

    const handleOpenEmbed = useCallback((channel: BaseChannel & ChannelEmbedAction) => {
        setActiveEmbedChannel(channel);
        setIsOpen(false);
    }, []);

    const hubspotContainerId = activeEmbedChannel
        ? `floating-comm-hubspot-${activeEmbedChannel.id}`
        : undefined;

    useEffect(() => {
        if (
            !activeEmbedChannel ||
            activeEmbedChannel.type !== "embed" ||
            activeEmbedChannel.embedMode !== "hubspot" ||
            !activeEmbedChannel.hubspot ||
            !hubspotContainerId
        ) {
            return;
        }

        const hubspotConfig = activeEmbedChannel.hubspot;
        const container = hubspotContainerRef.current;
        if (!container) return;

        container.innerHTML = "";
        let cancelled = false;

        loadHubspotFormsScript()
            .then(() => {
                if (cancelled) return;
                const hubspot = window.hbspt;
                if (!hubspot?.forms?.create) return;

                hubspot.forms.create({
                    portalId: hubspotConfig.portalId,
                    formId: hubspotConfig.formId,
                    region: hubspotConfig.region,
                    target: `#${hubspotContainerId}`,
                });
            })
            .catch((error) => {
                console.error("HubSpot embed failed", error);
            });

        return () => {
            cancelled = true;
        };
    }, [activeEmbedChannel, hubspotContainerId]);

    const overlay = useMemo(() => {
        if (!mountNode || (!isOpen && !activeEmbedChannel)) return null;

        return createPortal(
            <>
                <button
                    type="button"
                    aria-label="Cerrar canales de comunicación"
                    className="floating-comm__overlay"
                    onClick={handleClose}
                    data-slot="floating-comm-overlay"
                />
                {isOpen ? (
                    <section
                        className="floating-comm__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="floating-comm-title"
                    >
                        <header className="floating-comm__panel-header">
                            <div>
                                <p
                                    id="floating-comm-title"
                                    className="floating-comm__panel-title"
                                >
                                    {panelTitle}
                                </p>
                                <p className="floating-comm__panel-description">
                                    {panelDescription}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="floating-comm__close"
                                onClick={handleClose}
                                aria-label="Cerrar"
                            >
                                <X size={18} />
                            </button>
                        </header>

                        <div
                            className="floating-comm__channels"
                            data-slot="floating-comm-list"
                        >
                            {channels.map((channel, index) => {
                                const isChannelIconUrl = typeof channel.icon === "string";
                                const ChannelIconComponent = isChannelIconUrl
                                    ? null
                                    : (channel.icon as LucideIcon);
                                const sharedContent = (
                                    <>
                                        <span className="floating-comm__channel-icon">
                                            {isChannelIconUrl ? (
                                                <img
                                                    src={channel.icon as string}
                                                    alt=""
                                                    className="floating-comm__channel-icon-image"
                                                />
                                            ) : (
                                                ChannelIconComponent && (
                                                    <ChannelIconComponent
                                                        size={18}
                                                        strokeWidth={2}
                                                    />
                                                )
                                            )}
                                        </span>
                                        <div className="floating-comm__channel-body">
                                            <span className="floating-comm__channel-title">
                                                {channel.title}
                                                {channel.badge ? (
                                                    <span className="floating-comm__channel-badge">
                                                        {channel.badge}
                                                    </span>
                                                ) : null}
                                            </span>
                                            {channel.description ? (
                                                <span className="floating-comm__channel-description">
                                                    {channel.description}
                                                </span>
                                            ) : null}
                                        </div>
                                    </>
                                );

                                if (channel.type === "link") {
                                    return (
                                        <div
                                            key={channel.id}
                                            className="floating-comm__channel-card"
                                        >
                                            <a
                                                className="floating-comm__channel-action"
                                                ref={index === 0 ? firstAnchorRef : undefined}
                                                href={channel.href}
                                                target={channel.target ?? "_blank"}
                                                rel={channel.rel ?? "noreferrer noopener"}
                                                onClick={handleClose}
                                            >
                                                {sharedContent}
                                            </a>
                                        </div>
                                    );
                                }

                                if (channel.type === "callback") {
                                    return (
                                        <div
                                            key={channel.id}
                                            className="floating-comm__channel-card"
                                        >
                                            <button
                                                className="floating-comm__channel-action"
                                                ref={index === 0 ? firstButtonRef : undefined}
                                                type="button"
                                                onClick={() => {
                                                    channel.onSelect();
                                                    handleClose();
                                                }}
                                            >
                                                {sharedContent}
                                            </button>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={channel.id}
                                        className="floating-comm__channel-card"
                                    >
                                        <button
                                            className="floating-comm__channel-action"
                                            ref={index === 0 ? firstButtonRef : undefined}
                                            type="button"
                                            onClick={() => handleOpenEmbed(channel)}
                                        >
                                            {sharedContent}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ) : null}

                {activeEmbedChannel ? (
                    <section
                        className="floating-comm__embed-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="floating-comm-embed-title"
                    >
                        <header className="floating-comm__panel-header">
                            <div>
                                <p
                                    id="floating-comm-embed-title"
                                    className="floating-comm__panel-title"
                                >
                                    {activeEmbedChannel.title}
                                </p>
                                <p className="floating-comm__panel-description">
                                    {activeEmbedChannel.description ??
                                        "Completa el formulario para continuar."}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="floating-comm__close"
                                onClick={handleClose}
                                aria-label="Cerrar formulario"
                            >
                                <X size={18} />
                            </button>
                        </header>
                        <div className="floating-comm__embed-frame">
                            {activeEmbedChannel.embedMode === "hubspot" &&
                                activeEmbedChannel.hubspot ? (
                                <div
                                    id={hubspotContainerId}
                                    ref={hubspotContainerRef}
                                    className="floating-comm__hubspot-container"
                                    aria-live="polite"
                                />
                            ) : activeEmbedChannel.embedUrl ? (
                                <iframe
                                    src={activeEmbedChannel.embedUrl}
                                    title={
                                        activeEmbedChannel.embedTitle ??
                                        `Formulario ${activeEmbedChannel.title}`
                                    }
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    {...activeEmbedChannel.iframeProps}
                                />
                            ) : (
                                <p className="floating-comm__embed-empty">
                                    Este canal no tiene un recurso configurado.
                                </p>
                            )}
                        </div>
                    </section>
                ) : null}
            </>,
            mountNode,
        );
    }, [
        channels,
        activeEmbedChannel,
        handleClose,
        handleOpenEmbed,
        hubspotContainerId,
        isOpen,
        mountNode,
        panelDescription,
        panelTitle,
    ]);

    return (
        <>
            <div className={cn("floating-comm", className)} data-slot="floating-comm">
                <button
                    type="button"
                    className="floating-comm__fab"
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                    aria-pressed={isOpen}
                    aria-label={fabLabel}
                >
                    {isFabIconUrl ? (
                        <img
                            src={fabIcon as string}
                            alt=""
                            className="floating-comm__fab-image"
                        />
                    ) : (
                        FabIconComponent && (
                            <FabIconComponent size={22} strokeWidth={2.4} />
                        )
                    )}
                </button>
            </div>
            {overlay}
        </>
    );
};

export default FloatingCommunicationsButton;

