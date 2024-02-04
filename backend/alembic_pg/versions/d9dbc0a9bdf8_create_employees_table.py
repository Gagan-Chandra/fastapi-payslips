"""create employees table

Revision ID: d9dbc0a9bdf8
Revises: 
Create Date: 2024-01-19 21:25:36.790154

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd9dbc0a9bdf8'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table('employees',sa.Column('employee_id',sa.Integer(),primary_key = True, 
                        nullable = False),sa.Column('first_name',sa.String(), nullable = False),
                        sa.Column('last_name',sa.String(),nullable = False),
                        sa.Column('address',sa.String(), nullable = False),
                        sa.Column('employment_status',sa.String(),nullable = False),
                        sa.Column('created_at',sa.TIMESTAMP(timezone=True),
                        server_default=sa.text('now()'),nullable=False),
                        sa.Column('phone_number',sa.String(),nullable = False),
                        sa.Column('email',sa.String(),nullable = False) )
    pass


def downgrade() -> None:
    op.drop_table('employees')
    pass
