# GIT COMMANDS

## Setup

| Befehl                                         | Beschreibung                                   |
| ---------------------------------------------- | ---------------------------------------------- |
| `git config --global user.name "full name"`    | Erfoderlich, da Name in Git History auftaucht  |
| `git config --global user.email "valid email"` | Erfoderlich, da sie mit Verlauf verknüpft wird |
| `git config --global color.ui auto`            | Farben in Befehlszeile verwenden               |

## Setup & Init

| Befehl            | Beschreibung                                   |
| ----------------- | ---------------------------------------------- |
| `git init`        | Neues Repository anlegen                       |
| `git clone [url]` | kopieren von einem Online-Repository am Anfang |

## Stage & Snapshot

| Befehl                                | Beschreibung                                                     |
| ------------------------------------- | ---------------------------------------------------------------- |
| `git status`                          | Änderungen im Arbeitsverzeichnis anzeigen lassen                 |
| `git add .`                           | alle Änderungen für ein Commit vorschlagen                       |
| `git reset .`                         | Vorgeschlagene Änderungen zurück nehmen                          |
| `git commit -m "L0rum ipsum"`         | Vorgeschlagene Änderungen lokal commiten / eintragen             |
| `git commit -am "L0rum ipsum"`        | Führt vor dem commit ein `git add .` aus                         |
| `git commit --amend -m "Lorem ipsum"` | Letzte Message ändern (**nur bei lokalen Commits empfohlen!**)   |
| `git commit --amend --no-edit`        | Änderungen zum letzten Commit hinzufügen und Message beibehalten |

<details>
<summary><b>Untersuchen & Vergleiche</b></summary>

| Befehl                                 | Beschreibung                                                   |
| -------------------------------------- | -------------------------------------------------------------- |
| `git log`                              | Änderungsverlauf anzeigen                                      |
| `git log branchB..branchA`             | Änderungsverlauf branchA anzeigen welche nicht in branchB sind |
| `git log --graph --oneline --decorate` | Änderungsverlauf als knappe Aufschlüsselung darstellen         |
| `git diff`                             | Aktuelle Änderungen (unstaged) anzeigen                        |
| `git diff --staged`                    | Aktuelle Änderungen (staged) anzeigen                          |
| `git diff branchB..branchA`            | Änderungen von branchA anzeigen welche nicht in branchB sind   |

</details>

<details>
<summary><b>Zwischenspeichern</b></summary>

| Befehl           | Beschreibung                          |
| ---------------- | ------------------------------------- |
| `git stash`      | Änderungen zwischenspeichern          |
| `git stash list` | Stash auflisten                       |
| `git stash pop`  | Änderungen wiederherstellen           |
| `git stash drop` | Letzte Änderungen vom Stash verwerfen |

</details>

## Freigeben & Aktualisieren

| Befehl                         | Beschreibung                                                       |
| ------------------------------ | ------------------------------------------------------------------ |
| `git remote add [alias] [url]` | Git URL als alias hinzufügen                                       |
| `git fetch [alias]`            | Informationen aller Branchen von Remote synchronisieren            |
| `git merge [alias]/[branch]`   | Änderungen von Remote zusammenführen (kann **Konflikte** auslösen) |
| `git push [alias] [branch]`    | eigene lokale Repo-Version hochladen                               |
| `git pull`                     | fetch und merge vom aktuellen remote branch                        |

## Branches

| Befehl                        | Beschreibung                                    |
| ----------------------------- | ----------------------------------------------- |
| `git branch`                  | Branches auflisten                              |
| `git branch [branch]`         | Branch erstellen                                |
| `git checkout [branch]`       | Zu Branch wechseln                              |
| `git checkout -b [branch]`    | Neuen Branch erstellen und auschecken           |
| `git merge [branch]`          | Branch mit Aktuellem zusammenführen             |
| `git merge [branch] --squash` | Zusammenführen und alles Commits zusammenfassen |

## Sonstiges

| Befehl                | Beschreibung                                                              |
| --------------------- | ------------------------------------------------------------------------- |
| `git clean -df`       | Ohne Nachfrage unversionierte Dateien löschen (praktisch für Builds etc.) |
| `git format-patch -5` | Je eine Patch-Datei für die letzten 5 commits erstellen                   |
| `git am [patch]`      | Patch-Datei anwenden                                                      |

[git homepage](https://git-scm.com)
