"""add bank table

Revision ID: 5cf7713666fa
Revises: 
Create Date: 2024-01-20 00:45:42.269127

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5cf7713666fa'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('bank',
                        sa.Column('bank_id',sa.Integer(),nullable=False,autoincrement = True),
                        sa.Column('bank_name',sa.VARCHAR(50), nullable = False),
                        sa.Column('account_number',sa.Integer(),nullable=False),
                        sa.Column('routing_number',sa.Integer(),nullable=False),
                        sa.Column('employee_email',sa.VARCHAR(50),nullable=False),
                        sa.PrimaryKeyConstraint('bank_id'),
                        sa.UniqueConstraint('employee_email'))
    pass


def downgrade() -> None:
    op.drop_table('bank')
    pass
