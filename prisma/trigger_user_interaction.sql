-- Crear la función que se ejecutará cuando se active el trigger
CREATE OR REPLACE FUNCTION update_user_interactions_and_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar el rol del usuario según el número de interacciones
    UPDATE "User"
    SET user_role_id = (
        SELECT id
        FROM "UserRole"
        WHERE min_interactions <= NEW.interactions
        ORDER BY min_interactions DESC
        LIMIT 1
    )
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que se ejecutará después de una actualización en la tabla User
CREATE TRIGGER update_user_interactions_and_role_trigger
AFTER UPDATE OF interactions ON "User"
FOR EACH ROW
WHEN (OLD.interactions IS DISTINCT FROM NEW.interactions)
EXECUTE FUNCTION update_user_interactions_and_role();