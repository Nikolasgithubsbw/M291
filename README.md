# M291
Laurin &amp; Niki Code
Testfälle und dokumentierte Fehler
Testfall 1: Fehler beim Löschen eines Projekts
Beschreibung:
Beim Versuch, ein Projekt zu löschen, trat der folgende Fehler auf:

json
"message": "Statement execute error: Could not delete from {self->getTableName()}:Cannot delete or update a parent row: a foreign key constraint fails (`jkingma_projects`.`studentroleproject`, CONSTRAINT `studentroleproject_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ID`))"
Fehlerursache:
Der Fehler trat auf, weil in der Datenbank eine Foreign Key Constraint existiert. Diese Verknüpfung verhinderte das Löschen eines Projekts, solange noch Verknüpfungen in der Tabelle studentroleproject existierten.

Lösung:
Zwei mögliche Lösungen wurden identifiziert:

Cascading Delete in der Datenbankstruktur: Der Foreign Key wurde so konfiguriert, dass beim Löschen eines Projekts alle verknüpften Einträge in studentroleproject automatisch gelöscht werden. Dies geschieht durch das Hinzufügen von ON DELETE CASCADE zur Foreign Key Constraint.

SQL-Statement:

sql
ALTER TABLE studentroleproject
ADD CONSTRAINT studentroleproject_ibfk_1
FOREIGN KEY (ProjectID) REFERENCES project(ID)
ON DELETE CASCADE;
Manuelles Löschen verknüpfter Einträge: Vor dem Löschen eines Projekts wurden alle verknüpften Datensätze in studentroleproject manuell entfernt. Dies wurde durch Anpassung des Codes ermöglicht:

javascript
Code kopieren
async deleteProject(projectId) {
    // Zuerst die verknüpften Rollen löschen
    const deleteRolesResponse = await fetch(`https://api-sbw-plc.sbw.media/Studentroleproject/deleteByProject/${projectId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    // Danach das Projekt löschen
    const response = await fetch(`https://api-sbw-plc.sbw.media/Project/${projectId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}

Testfall 2: Fehlende Validierung beim Erstellen eines Projekts
Beschreibung:
Beim Erstellen eines Projekts konnten Benutzer das Formular absenden, ohne notwendige Felder wie den Projektnamen auszufüllen. Dies führte zu unvollständigen Datensätzen in der Datenbank.

Fehlerursache:
Die Validierung des Projektformulars war unzureichend, und wichtige Felder wurden nicht überprüft, bevor das Projekt abgesendet wurde.

Lösung:
Eine Validierung wurde hinzugefügt, um sicherzustellen, dass alle notwendigen Felder (z.B. Projektname, ausgewählte Kunden, Personen) ausgefüllt sind, bevor das Projekt gespeichert wird:

javascript
Code kopieren
submitProject() {
    if (
        this.projectName === "" ||
        this.selectedCustomer === "" ||
        this.selectedPersons.length === 0
    ) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
    }
    // Logik zum Speichern des Projekts
}
Testfall 3: Dropdown für die Mehrfachauswahl von Personen zeigt keine Personen an
Beschreibung:
Das Dropdown-Menü zur Auswahl mehrerer Personen in der Projektzuweisungsansicht zeigte keine Einträge an, selbst nachdem die API-Daten erfolgreich geladen wurden.

Fehlerursache:
Der Fehler wurde durch eine falsche Bindung der Daten im Dropdown verursacht. Das Dropdown war nicht korrekt mit der Liste der geladenen Personen verknüpft.