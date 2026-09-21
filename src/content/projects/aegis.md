---
name: "AEGIS"
order: 1
description: "An AI-enabled industrial safety platform designed to turn existing workplace monitoring systems into proactive tools for detecting hazards, monitoring conditions, and supporting safer operations."
tags: ["Artificial Intelligence", "Computer Vision", "Industrial Safety", "Analytics"]
# image: "../../assets/projects/cover-aegis.png"   (uncomment once the cover file is added)
role: "Solo"
year: 2026
status: "In progress"
---

## Overview

AEGIS is an industrial safety platform designed to help organizations move from reactive incident reporting toward proactive workplace safety monitoring. It combines visual analysis and environmental data processing to identify potential hazards and provide timely safety insights.

The project was built around the idea that existing monitoring infrastructure can be made more useful through intelligent software, without requiring organizations to completely replace their existing systems. The platform is designed for industrial environments where multiple safety conditions need to be monitored continuously.

## What it does

- Monitors workplace environments for visible safety hazards
- Identifies potential fire and smoke conditions from visual inputs
- Detects potential industrial spills and unsafe environmental conditions
- Monitors PPE compliance in designated work areas
- Identifies potential worker falls using visual and positional information
- Calculates Wet Bulb Globe Temperature (WBGT) for heat stress monitoring
- Combines environmental measurements to estimate workplace heat stress conditions
- Provides structured safety events that can be used for alerts and reporting
- Supports continuous monitoring of different industrial zones
- Designed to work with existing workplace camera infrastructure

## Safety monitoring

AEGIS is designed around multiple independent safety capabilities rather than treating workplace safety as a single detection problem.

Each capability processes its relevant inputs and produces a structured result that can be interpreted by the broader platform. This makes it possible to add or modify individual safety capabilities without redesigning the entire system.

The platform covers both **visual safety monitoring** and **environmental safety monitoring**, allowing different types of workplace risks to be handled within the same system.

## Heat stress monitoring

One of the components focuses on workplace heat stress using Wet Bulb Globe Temperature (WBGT).

The system can work with environmental inputs such as air temperature, relative humidity, wind conditions, UV information, and globe temperature when available. When certain measurements are unavailable, the system can estimate intermediate values using appropriate mathematical approximations before calculating WBGT.

The goal is to provide a continuous indication of heat stress conditions across monitored work areas rather than relying only on individual temperature measurements.

## How I built it

The platform is being developed as a modular system where each safety capability operates independently while following common data and processing patterns. Visual monitoring components process camera inputs, while the WBGT component processes environmental data and performs the required calculations.

A common processing approach allows individual safety results to be converted into structured events that can eventually be stored, visualized, and used by an alerting layer. This separation keeps the detection logic independent from application-level concerns such as storage, reporting, and notifications.

A major part of the engineering work has been organizing several independently developed capabilities into a consistent architecture that can run together as a single industrial safety platform.

## Engineering focus

The project involves more than implementing individual detection features. A significant part of the work focuses on making the components operate reliably together.

Key engineering considerations include:

- Modular service design
- Continuous input processing
- Data validation and normalization
- Independent safety processing pipelines
- Structured safety events
- Environmental data processing
- Persistent storage and reporting
- Configuration-driven deployment
- Handling multiple workloads simultaneously
- Designing the system for future expansion

## What I learned

Working on AEGIS taught me that building an AI-enabled product involves considerably more than training or integrating individual models. The difficult part is creating reliable interfaces between independent components, managing continuous data flows, and designing the surrounding software architecture so that different capabilities can operate together.

I also learned how important it is to separate detection logic from business logic, data storage, alerting, and presentation. That separation makes the system easier to test, maintain, and extend.

## Future direction

The platform is being structured so that additional industrial safety capabilities can be integrated without fundamentally changing the existing architecture. Future development can focus on improving monitoring coverage, expanding environmental analysis, strengthening alerting workflows, and connecting safety events with broader industrial systems.
