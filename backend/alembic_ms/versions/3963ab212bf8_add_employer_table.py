"""Add employer table

Revision ID: 3963ab212bf8
Revises: 
Create Date: 2024-01-19 22:25:39.219920

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3963ab212bf8'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table('employer',
                        sa.Column('employer_id',sa.Integer(),nullable=False),
                        sa.Column('company_name',sa.VARCHAR(50), nullable = False),
                        sa.Column('employee_email',sa.VARCHAR(50),nullable = False),
                        sa.Column('company_address',sa.VARCHAR(50),nullable=False),
                        sa.Column('company_contact',sa.VARCHAR(50),nullable=False),
                        sa.PrimaryKeyConstraint('employer_id'),
                        sa.UniqueConstraint('employee_email'))
    pass


def downgrade() -> None:
    op.drop_table('employer')
    pass
