import rules

# Predicates


@rules.predicate
def is_task_owner(user, task):
    return task.user == user


@rules.predicate
def is_boss(user):
    return user.is_superuser

# Rules

rules.add_rule("change_task", is_task_owner)
rules.add_rule("delete_task", is_task_owner)

# Permissions

rules.add_perm("base.change_task", is_task_owner)
rules.add_perm("base.delete_task", is_task_owner)
