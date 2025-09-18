# Dialog List Card

![Version][version-src]
[![HACS: Default][hacs-src]][hacs-href]
[![Downloads][downloads-src]][downloads-href]
[![Hits per month][hits-src]][hits-href]
[![Downloads total][total-src]][total-href]

> A Home Assistant card for Dialog with List

![Card](https://raw.githubusercontent.com/rzeiler/button-dropdown-card/main/assets/card.png)

## Installation

If you have [HACS](https://hacs.xyz/), you can install the Dialog List Card from there and jump to the "Configuration" step

Otherwise, follow these simple steps:

1. In your home assistant, go to the `/config/lovelace/resources` page, or from your dashboard, click on the pencil icon > 3 dots > Manage resources

2. Click on "Add resource"

3. Set the URL to `https://cdn.jsdelivr.net/gh/rzeiler/button-dropdown-card/button-dropdown.js` and "JavaScript Module" as the resource type

4. Click "Create"

**Note:** The Dialog List Card will upgrade automatically a few days after every new release (once your browser cache expires)

However, you can enforce a [specific version](https://github.com/rzeiler/button-dropdown-card/releases) by adding `@X.X.X` at the end of the URL (e.g: `https://[...]/button-dropdown-card@1.0.0/`)

## Configuration

To start with an example configuration, you can create a new card in your dashboard, then:

-   Choose "**Custom: Dialog List Card**" in the card picker

Example configuration within an **Entities** card:

```yaml
type: custom:dialog-list-card
# Card configuration starts here
title: Wischen oder Saugen
icon: mdi:robot-vacuum
dialog_title: Auswahl
# Displays the state entity on or off
state_on_entity: binary_sensor.vacuum_running
entities:
  - entity: script.vacuum_one
    title: Wischen & Saugen
    icon: mdi:robot-vacuum
  - entity: script.vacuum_two
    title: Saugen
    icon: mdi:robot-vacuum
```

## License

MIT © [Zeiler R](https://github.com/rzeiler)

[version-src]: https://img.shields.io/github/v/release/rzeiler/button-dropdown-card?display_name=tag&sort=semver
[hits-src]: https://data.jsdelivr.com/v1/package/gh/rzeiler/button-dropdown-card/badge
[downloads-src]: https://img.shields.io/github/downloads/rzeiler/button-dropdown-card/total?label=installs%20(HACS)
[hacs-src]: https://flat.badgen.net/badge/HACS/default/orange
[total-src]: https://img.shields.io/github/downloads/rzeiler/button-dropdown-card/total?label=Downloads%20Total

[hits-href]: https://www.jsdelivr.com/package/gh/rzeiler/button-dropdown-card
[downloads-href]: https://github.com/rzeiler/button-dropdown-card/releases/
[hacs-href]: https://hacs.xyz/
[total-href]: https://github.com/rzeiler/button-dropdown-card/releases/